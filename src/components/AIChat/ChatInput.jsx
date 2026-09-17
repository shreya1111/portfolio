import { useRef } from 'react'

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <form
      className="chat-input"
      onSubmit={(e) => {
        e.preventDefault()
        onSend()
      }}
    >
      <label htmlFor="ai-chat-textarea" className="sr-only">
        Ask about Shreya's work
      </label>
      <textarea
        id="ai-chat-textarea"
        ref={textareaRef}
        className="chat-input__field"
        placeholder="Ask anything about Shreya..."
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        type="submit"
        className="chat-input__send"
        aria-label="Send message"
        disabled={disabled || !value.trim()}
      >
        ➤
      </button>
    </form>
  )
}
