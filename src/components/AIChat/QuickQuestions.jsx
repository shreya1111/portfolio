export default function QuickQuestions({ questions, onSelect, disabled }) {
  return (
    <div className="chat-quick" role="group" aria-label="Suggested questions">
      {questions.map((q) => (
        <button
          key={q}
          type="button"
          className="chat-quick__chip"
          onClick={() => onSelect(q)}
          disabled={disabled}
        >
          {q}
        </button>
      ))}
    </div>
  )
}
