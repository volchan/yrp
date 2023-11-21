import { ReactNode } from 'react'

import '../styles/components/container.scss'

interface Props {
  children?: ReactNode
  style?: React.CSSProperties
}

const Container = ({ children, ...props }: Props) => (
  <div className="container" {...props}>
    {children}
  </div>
)

export default Container
