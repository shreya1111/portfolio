import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '../../data'
import { getAssistantResponse, QUICK_QUESTIONS } from '../../services/portfolioAssistant'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import QuickQuestions from './QuickQuestions'
import './AIChat.css'

const WELCOME = {
  role: 'assistant',
  content: `Hi, I'm the AI assistant for ${PROFILE.name}'s portfolio. Ask me about her projects, skills, experience, or how to get in touch.`,
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  const panelRef = useRef(null)
  const toggleBtnRef = useRef(null)
  const listRef = useRef(null)

  // Escape to close, focus trap while open
  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'button, [href], textarea, input, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    panelRef.current?.querySelector('textarea')?.focus()
    document.body.style.overflow = window.innerWidth <= 640 ? 'hidden' : ''

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [open])

  // Auto-scroll to latest message
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, typing])

  const sendMessage = async (text) => {
    const trimmed = (text ?? input).trim()
    if (!trimmed || typing) return

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setInput('')
    setTyping(true)

    const response = await getAssistantResponse(trimmed)

    // Small delay so the typing indicator reads naturally, without faking a network call.
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
      setTyping(false)
    }, 380)
  }

  const clearChat = () => setMessages([WELCOME])

  return (
    <>
      <button
        ref={toggleBtnRef}
        type="button"
        className={`ai-toggle ${open ? 'is-active' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="ai-chat-panel"
        aria-label={open ? 'Close portfolio assistant' : 'Ask Shreya AI'}
      >
        <span className="ai-toggle__spark" aria-hidden="true">✦</span>
        <span className="ai-toggle__label">{open ? 'Close' : 'Ask Shreya AI'}</span>
      </button>

      {open && (
        <div className="ai-chat-overlay">
          <section
            id="ai-chat-panel"
            ref={panelRef}
            className="ai-chat glass"
            role="dialog"
            aria-modal="true"
            aria-label="Shreya AI portfolio assistant"
          >
            <header className="ai-chat__header">
              <div className="ai-chat__heading">
                <span className="ai-chat__spark" aria-hidden="true">✦</span>
                <div>
                  <p className="ai-chat__title">Shreya AI</p>
                  <p className="ai-chat__subtitle">Ask about my work</p>
                </div>
              </div>
              <div className="ai-chat__header-actions">
                <button type="button" className="ai-chat__clear" onClick={clearChat}>
                  Clear
                </button>
                <button
                  type="button"
                  className="ai-chat__close"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
            </header>

            <div className="ai-chat__body" ref={listRef}>
              <QuickQuestions questions={QUICK_QUESTIONS} onSelect={sendMessage} disabled={typing} />

              <div className="ai-chat__messages">
                {messages.map((m, i) => (
                  <ChatMessage key={i} role={m.role} content={m.content} />
                ))}
                {typing && (
                  <div className="chat-msg chat-msg--ai">
                    <span className="chat-msg__avatar" aria-hidden="true">✦</span>
                    <span className="chat-typing" aria-label="Assistant is typing">
                      <span />
                      <span />
                      <span />
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="ai-chat__footer">
              <ChatInput value={input} onChange={setInput} onSend={() => sendMessage()} disabled={typing} />
              <p className="ai-chat__disclaimer">
                Answers are generated from portfolio data, not a live model.
              </p>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
