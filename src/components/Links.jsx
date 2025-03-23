
export default function Link({ to, children, className, onClick, ...props }) {

  const handleClick = (e) => {
    e.preventDefault()

    if (onClick) {
      onClick(e)
    }

    window.location.href = to
  }

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}