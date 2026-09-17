export default function ChatMessage({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={`chat-msg ${isUser ? 'chat-msg--user' : 'chat-msg--ai'}`}>
      {!isUser && (
        <span className="chat-msg__avatar" aria-hidden="true">
          ✦
        </span>
      )}
      <p className="chat-msg__bubble">{content}</p>
    </div>
  )
}
