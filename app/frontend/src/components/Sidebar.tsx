import { Link } from 'react-router-dom'

import '../styles/components/sidebar.scss'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">YRP</Link>

      <Link to="/login">Login</Link>
    </div>
  )
}

export default Sidebar
