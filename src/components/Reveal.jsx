import useReveal from '../hooks/useReveal'

/**
 * Wraps children in a scroll-triggered fade/translate reveal.
 * `as` lets callers choose the rendered element (div, li, etc.).
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
