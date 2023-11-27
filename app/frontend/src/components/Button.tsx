import '../styles/components/button.scss'

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  type?: 'primary' | 'success' | 'danger' | 'warning' | 'info'
  /**
   * Is the button disabled?
   */
  disabled?: boolean
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  block?: boolean
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
const Button = ({
  type = 'primary',
  size = 'medium',
  disabled = false,
  block = false,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'button',
        `button--${type}`,
        `button--${size}`,
        disabled ? `button--${type}--disabled` : '',
        block ? 'button--block' : '',
      ].join(' ')}
      {...props}
    >
      {label}
    </button>
  )
}

export default Button
