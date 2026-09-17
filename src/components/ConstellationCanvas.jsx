import { useEffect, useRef } from 'react'

/**
 * ConstellationCanvas — dense, layered, cursor-reactive neural-network
 * background for the portfolio.
 *
 * Architecture
 * ────────────
 * Three depth layers (back / mid / fore) give genuine parallax-like depth.
 * Each layer has its own opacity, speed, and connection-strength budget.
 *
 * Particles
 * ─────────
 * Viewport-proportional count (area-based) with three size tiers:
 *   70% small  (r 0.9–1.4)
 *   25% medium (r 1.6–2.2)
 *    5% large  (r 2.4–3.2)
 * Each particle has an independent pulse phase so breathing feels organic.
 *
 * Connections
 * ───────────
 * Distance-gated with per-particle connection cap (MAX_CONN) to keep the
 * graph structured rather than fully connected.
 * Line opacity scales with proximity; closer → stronger.
 *
 * Atmosphere
 * ──────────
 * Three large, very-low-opacity radial gradients are painted on a separate
 * off-screen canvas once and composited cheaply every frame.
 *
 * Performance
 * ───────────
 * Single canvas, requestAnimationFrame loop, proper cleanup on unmount.
 * Resize rebuilds particles once (debounced 120 ms).
 * Connection inner loop exits early via connection cap.
 * Reduced-motion: one static frame, no RAF.
 */
export default function ConstellationCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Configuration ────────────────────────────────────────────────────
    // All tunables in one place.

    // Particle density: area-based scaling.
    // Calibrated so a 1440×900 viewport gets ~120 particles (1 per 10 800 px²).
    // Hard caps per bucket keep mobile smooth and desktop rich.
    const DENSITY = 1 / 10_800 // particles per pixel²

    function particleCount(w, h) {
      const area = w * h
      const raw  = Math.round(area * DENSITY)
      if (w < 480)  return Math.min(Math.max(raw, 26), 38)
      if (w < 768)  return Math.min(Math.max(raw, 42), 65)
      if (w < 1100) return Math.min(Math.max(raw, 68), 95)
      return Math.min(Math.max(raw, 90), 140)
    }

    // Depth layers: each particle is assigned a layer (0=back, 1=mid, 2=fore)
    // with weighted probability: 35% back, 50% mid, 15% fore.
    const LAYER_WEIGHTS = [0.35, 0.85, 1.0] // cumulative

    const LAYER = {
      // [speed multiplier, base opacity, connection alpha multiplier, radius multiplier]
      0: { speed: 0.35, opacity: 0.28, connAlpha: 0.45, radiusMult: 0.75 }, // back
      1: { speed: 0.70, opacity: 0.52, connAlpha: 0.80, radiusMult: 1.00 }, // mid
      2: { speed: 1.10, opacity: 0.78, connAlpha: 1.00, radiusMult: 1.30 }, // fore
    }

    const LINK_DIST      = 170  // px – max distance for a connection
    const MOUSE_DIST     = 220  // px – mouse proximity influence radius
    const MAX_CONN       = 6    // max connections per particle (keeps graph sparse enough)
    const BASE_SPEED     = 0.18 // base drift speed (before layer multiplier)
    const PULSE_SPEED    = 0.0008 // radians per ms — pulse cycle ~7.8 s
    const LINE_WIDTH_MID = 0.8  // mid layer
    const LINE_WIDTH_BACK= 0.5  // back layer
    const LINE_WIDTH_FORE= 1.1  // fore layer

    // Color palette — cool-blue/cyan dominant, violet secondary, rare white
    const palette = [
      // weight 5 — cyan/teal (dominant cool)
      { r: 112, g: 218, b: 242, w: 5 },
      { r: 125, g: 211, b: 232, w: 5 },
      { r: 100, g: 200, b: 255, w: 4 },
      // weight 4 — blue-violet
      { r: 147, g: 122, b: 255, w: 4 },
      { r: 167, g: 139, b: 250, w: 4 },
      // weight 2 — pink/violet
      { r: 200, g: 160, b: 240, w: 2 },
      { r: 220, g: 180, b: 255, w: 2 },
      // weight 1 — rare near-white highlight
      { r: 230, g: 225, b: 255, w: 1 },
    ]

    // Pre-build weighted color table
    const colorTable = []
    for (const c of palette) {
      for (let i = 0; i < c.w; i++) colorTable.push(c)
    }

    // ── State ────────────────────────────────────────────────────────────
    let width = 0, height = 0
    let dpr = 1
    let particles = []
    let rafId = null
    let lastTime = 0
    let atmCanvas = null // off-screen atmospheric glow canvas

    const mouse = { x: -9999, y: -9999, active: false }

    // ── Atmosphere canvas (painted once, composited each frame) ──────────
    function buildAtmosphere(w, h) {
      const off = document.createElement('canvas')
      off.width  = Math.ceil(w)
      off.height = Math.ceil(h)
      const octx = off.getContext('2d')

      // Three large, very-low-opacity radial glows distributed across viewport
      const glows = [
        { cx: w * 0.18, cy: h * 0.22, rx: w * 0.55, ry: w * 0.55,
          r: 125, g: 211, b: 232, a: 0.055 }, // top-left cyan
        { cx: w * 0.82, cy: h * 0.30, rx: w * 0.50, ry: w * 0.50,
          r: 147, g: 122, b: 255, a: 0.048 }, // top-right violet
        { cx: w * 0.50, cy: h * 0.78, rx: w * 0.60, ry: w * 0.60,
          r: 100, g: 180, b: 255, a: 0.038 }, // bottom-center blue
      ]

      for (const g of glows) {
        const grad = octx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.rx)
        grad.addColorStop(0,    `rgba(${g.r},${g.g},${g.b},${g.a})`)
        grad.addColorStop(0.55, `rgba(${g.r},${g.g},${g.b},${(g.a * 0.3).toFixed(4)})`)
        grad.addColorStop(1,    `rgba(${g.r},${g.g},${g.b},0)`)
        octx.fillStyle = grad
        octx.fillRect(0, 0, w, h)
      }

      // Very subtle grid texture — technical/engineering feel
      // Only drawn if viewport is wide enough (skipped on mobile)
      if (w >= 768) {
        const CELL = 80
        octx.strokeStyle = 'rgba(140, 160, 220, 0.028)'
        octx.lineWidth = 0.5
        for (let x = 0; x < w; x += CELL) {
          octx.beginPath(); octx.moveTo(x, 0); octx.lineTo(x, h); octx.stroke()
        }
        for (let y = 0; y < h; y += CELL) {
          octx.beginPath(); octx.moveTo(0, y); octx.lineTo(w, y); octx.stroke()
        }
      }

      return off
    }

    // ── Particle factory ─────────────────────────────────────────────────
    function makeParticle() {
      // Layer
      const roll = Math.random()
      const layer = roll < LAYER_WEIGHTS[0] ? 0 : roll < LAYER_WEIGHTS[1] ? 1 : 2
      const lp = LAYER[layer]

      // Size tier: 70% small / 25% medium / 5% large
      const sizeRoll = Math.random()
      let baseR
      if (sizeRoll < 0.70) baseR = 0.9 + Math.random() * 0.5   // 0.9–1.4
      else if (sizeRoll < 0.95) baseR = 1.6 + Math.random() * 0.6 // 1.6–2.2
      else baseR = 2.4 + Math.random() * 0.8                      // 2.4–3.2
      const r = baseR * lp.radiusMult

      // Color
      const c = colorTable[Math.floor(Math.random() * colorTable.length)]

      // Velocity — slow drift with slight sinusoidal personality
      const angle = Math.random() * Math.PI * 2
      const speed = BASE_SPEED * lp.speed * (0.6 + Math.random() * 0.8)
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed

      // Pulse: each particle has an independent phase offset (0–2π)
      // and a random cycle length so they never all sync.
      const pulsePhase  = Math.random() * Math.PI * 2
      const pulsePeriod = 2500 + Math.random() * 3500 // ms, 2.5–6 s

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx, vy,
        r,
        layer,
        baseOpacity: lp.opacity * (0.8 + Math.random() * 0.4),
        c,
        pulsePhase,
        pulsePeriod,
        // Sinusoidal wander — slight lateral drift on top of base velocity
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: 0.0003 + Math.random() * 0.0005,
        wanderAmp: 0.04 + Math.random() * 0.06,
      }
    }

    function makeParticles() {
      const count = particleCount(width, height)
      particles = Array.from({ length: count }, makeParticle)
    }

    // ── Resize (debounced 120 ms) ─────────────────────────────────────────
    let resizeTimer = null
    function resize() {
      width  = window.innerWidth
      height = window.innerHeight
      dpr    = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width  = Math.round(width  * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width  = width  + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      atmCanvas = buildAtmosphere(width, height)
      makeParticles()
    }
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 120)
    }

    // ── Draw ─────────────────────────────────────────────────────────────
    function draw(ts) {
      const dt = Math.min(ts - lastTime, 50) // cap at 50 ms to survive tab switches
      lastTime = ts

      ctx.clearRect(0, 0, width, height)

      // 1. Atmospheric glow (off-screen canvas, single drawImage call)
      if (atmCanvas) ctx.drawImage(atmCanvas, 0, 0)

      // 2. Update particle positions & collect connection candidates
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!reduced) {
          // Wander: slowly rotating velocity direction
          p.wanderAngle += p.wanderSpeed * dt
          const wx = Math.cos(p.wanderAngle) * p.wanderAmp
          const wy = Math.sin(p.wanderAngle) * p.wanderAmp
          p.x += (p.vx + wx) * (dt * 0.6)
          p.y += (p.vy + wy) * (dt * 0.6)

          // Soft bounce — wrap with slight margin so particles don't cluster at edges
          if (p.x < -20)        { p.x = width  + 10; }
          else if (p.x > width  + 20) { p.x = -10; }
          if (p.y < -20)        { p.y = height + 10; }
          else if (p.y > height + 20) { p.y = -10; }
        }
      }

      // 3. Connection pass — O(n²) but capped by MAX_CONN early exit
      const connCounts = new Uint8Array(particles.length) // fast per-particle counter

      for (let i = 0; i < particles.length; i++) {
        if (connCounts[i] >= MAX_CONN) continue
        const a = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          if (connCounts[i] >= MAX_CONN) break
          if (connCounts[j] >= MAX_CONN) continue

          const dx = a.x - particles[j].x
          const dy = a.y - particles[j].y
          const dist2 = dx * dx + dy * dy
          if (dist2 > LINK_DIST * LINK_DIST) continue

          const b = particles[j]
          const dist = Math.sqrt(dist2)

          // Proximity alpha — stronger when close
          const t = 1 - dist / LINK_DIST           // 0..1
          // Average the two layers' connection strengths
          const layerFactor = (LAYER[a.layer].connAlpha + LAYER[b.layer].connAlpha) * 0.5
          let alpha = t * t * 0.28 * layerFactor   // quadratic fall-off

          // Mouse brightening on the midpoint of the line
          if (mouse.active) {
            const mx = (a.x + b.x) * 0.5 - mouse.x
            const my = (a.y + b.y) * 0.5 - mouse.y
            const md2 = mx * mx + my * my
            if (md2 < MOUSE_DIST * MOUSE_DIST) {
              const mt = 1 - Math.sqrt(md2) / MOUSE_DIST
              alpha += mt * mt * 0.45
            }
          }

          alpha = Math.min(alpha, 0.72)

          // Line color — blend toward the brighter (foreground) particle
          const dominant = a.layer >= b.layer ? a : b
          const lw = a.layer === 0 && b.layer === 0
            ? LINE_WIDTH_BACK
            : a.layer === 2 || b.layer === 2
              ? LINE_WIDTH_FORE
              : LINE_WIDTH_MID

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${dominant.c.r},${dominant.c.g},${dominant.c.b},${alpha.toFixed(3)})`
          ctx.lineWidth = lw
          ctx.stroke()

          connCounts[i]++
          connCounts[j]++
        }
      }

      // 4. Node pass — drawn on top of connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Pulse: sinusoidal opacity breathing
        const pulseMod = reduced ? 0 : Math.sin(ts * PULSE_SPEED * (6280 / p.pulsePeriod) + p.pulsePhase)
        const opacityPulse = pulseMod * 0.18 // ±0.18 variation

        let opacity = p.baseOpacity + opacityPulse

        // Mouse proximity brightening
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < MOUSE_DIST * MOUSE_DIST) {
            const mt = 1 - Math.sqrt(dist2) / MOUSE_DIST
            opacity = Math.min(opacity + mt * mt * 0.7, 1.0)
          }
        }

        opacity = Math.max(0.06, Math.min(opacity, 1.0))

        // Soft glow — painted as a larger dim circle first, then the crisp dot
        if (p.layer >= 1 && p.r > 1.2) {
          const glowR = p.r * (p.layer === 2 ? 4.5 : 3.2)
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
          grd.addColorStop(0,   `rgba(${p.c.r},${p.c.g},${p.c.b},${(opacity * 0.28).toFixed(3)})`)
          grd.addColorStop(1,   `rgba(${p.c.r},${p.c.g},${p.c.b},0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
        }

        // Crisp node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c.r},${p.c.g},${p.c.b},${opacity.toFixed(3)})`
        ctx.fill()
      }

      // 5. Mouse → nearby-node radial lines
      if (mouse.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < MOUSE_DIST * MOUSE_DIST) {
            const mt = 1 - Math.sqrt(dist2) / MOUSE_DIST
            const alpha = mt * mt * 0.55
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `rgba(199,192,232,${alpha.toFixed(3)})`
            ctx.lineWidth = 0.65
            ctx.stroke()
          }
        }
      }
    }

    // ── Animation loop ────────────────────────────────────────────────────
    function loop(ts) {
      draw(ts)
      rafId = requestAnimationFrame(loop)
    }

    // ── Event listeners ───────────────────────────────────────────────────
    function onMove(e) {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true
    }
    function onLeave() {
      mouse.active = false; mouse.x = -9999; mouse.y = -9999
    }
    function onTouch(e) {
      if (e.touches?.[0]) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
        mouse.active = true
      }
    }

    // ── Boot ─────────────────────────────────────────────────────────────
    resize()

    window.addEventListener('resize',     onResize)
    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mouseout',   onLeave)
    window.addEventListener('touchmove',  onTouch, { passive: true })
    window.addEventListener('touchend',   onLeave)

    if (reduced) {
      // Single static frame — honour prefers-reduced-motion
      draw(0)
    } else {
      rafId = requestAnimationFrame(loop)
    }

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      if (rafId)       cancelAnimationFrame(rafId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize',     onResize)
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseout',   onLeave)
      window.removeEventListener('touchmove',  onTouch)
      window.removeEventListener('touchend',   onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  )
}
