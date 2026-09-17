import { useEffect, useMemo, useRef, useState } from 'react'
import { NAV_LINKS, PROFILE, RESUME_URL } from '../../data'
import './CommandPalette.css'

function buildCommands() {
  const commands = NAV_LINKS.filter((link) => !link.isResume).map((link) => ({
    id: link.href,
    label: link.label,
    hint: 'Section',
    action: (navigate) => navigate(link.href),
  }))

  commands.push(
    {
      id: 'github-profile',
      label: 'GitHub Profile',
      hint: 'Opens in new tab',
      action: () => window.open(PROFILE.github, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      hint: 'Opens in new tab',
      action: () => window.open(PROFILE.linkedin, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'resume',
      label: 'Resume',
      hint: 'Opens in new tab',
      action: () => window.open(RESUME_URL || PROFILE.github, '_blank', 'noopener,noreferrer'),
    }
  )

  return commands
}

const COMMANDS = buildCommands()

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMANDS
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q))
  }, [query])

  // Global Ctrl/Cmd+K listener
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', handleGlobalKey)
    return () => document.removeEventListener('keydown', handleGlobalKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      document.body.style.overflow = 'hidden'
      window.setTimeout(() => inputRef.current?.focus(), 10)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const runCommand = (cmd) => {
    if (!cmd) return
    cmd.action((href) => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    })
    setOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      runCommand(results[activeIndex])
    }
  }

  useEffect(() => {
    const activeEl = listRef.current?.children[activeIndex]
    activeEl?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  if (!open) return null

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div
        className="cmdk glass"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cmdk__input-row">
          <span className="cmdk__icon" aria-hidden="true">⌘</span>
          <input
            ref={inputRef}
            className="cmdk__input"
            type="text"
            placeholder="Search portfolio..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search portfolio commands"
            aria-activedescendant={results[activeIndex] ? `cmdk-item-${results[activeIndex].id}` : undefined}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
          />
          <kbd className="cmdk__esc">Esc</kbd>
        </div>

        <ul className="cmdk__list" id="cmdk-list" ref={listRef} role="listbox">
          {results.length === 0 && <li className="cmdk__empty">No matches.</li>}
          {results.map((cmd, i) => (
            <li
              key={cmd.id}
              id={`cmdk-item-${cmd.id}`}
              role="option"
              aria-selected={i === activeIndex}
              className={`cmdk__item ${i === activeIndex ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => runCommand(cmd)}
            >
              <span>{cmd.label}</span>
              <span className="cmdk__hint">{cmd.hint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
