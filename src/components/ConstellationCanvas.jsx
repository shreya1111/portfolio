import { useEffect, useRef } from 'react'

/**
 * Cursor-reactive particle "constellation" behind the whole page.
 * Nodes drift and connect like a neural network / star map, and
 * brighten near the cursor. Cleaned up on unmount. Respects
 * prefers-reduced-motion (renders one static frame, no animation).
 */
export default function ConstellationCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let rafId = null

    const mouse = { x: -9999, y: -9999, active: false }

    // Accent colors sampled for nodes
    const palette = [
      { r: 167, g: 139, b: 250 }, // lavender
      { r: 125, g: 211, b: 232 }, // cyan
      { r: 244, g: 184, b: 228 }, // pink
    ]

    function particleCount() {
      // Keep the count reasonable — ~45% of desktop under 600px to protect
      // performance/battery on mobile while keeping the network visible.
      if (width < 600) return 42
      if (width < 1000) return 64
      return 92
    }

    function makeParticles() {
      const count = particleCount()
      particles = Array.from({ length: count }, () => {
        const c = palette[Math.floor(Math.random() * palette.length)]
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 0.8,
          c,
        }
      })
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      makeParticles()
    }

    const LINK_DIST = 130
    const MOUSE_DIST = 190

    function draw() {
      ctx.clearRect(0, 0, width, height)

      // Move + draw nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
        }

        // Brightness boost near cursor
        let glow = 0.5
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_DIST) {
            glow = 0.5 + (1 - dist / MOUSE_DIST) * 0.9
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c.r}, ${p.c.g}, ${p.c.b}, ${Math.min(glow, 1)})`
        ctx.fill()
      }

      // Draw connective links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            let alpha = (1 - dist / LINK_DIST) * 0.32

            // Brighten links near cursor
            if (mouse.active) {
              const mx = (a.x + b.x) / 2 - mouse.x
              const my = (a.y + b.y) / 2 - mouse.y
              const md = Math.hypot(mx, my)
              if (md < MOUSE_DIST) {
                alpha += (1 - md / MOUSE_DIST) * 0.4
              }
            }

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${a.c.r}, ${a.c.g}, ${a.c.b}, ${Math.min(alpha, 0.75)})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      // Draw lines from cursor to nearby nodes
      if (mouse.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_DIST) {
            const alpha = (1 - dist / MOUSE_DIST) * 0.5
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `rgba(199, 192, 232, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
    }

    function loop() {
      draw()
      rafId = requestAnimationFrame(loop)
    }

    function onMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    function onLeave() {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }
    function onTouch(e) {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
        mouse.active = true
      }
    }

    resize()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onLeave)

    if (reduced) {
      // Static single frame — no animation loop.
      draw()
    } else {
      loop()
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onLeave)
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
      }}
    />
  )
}
