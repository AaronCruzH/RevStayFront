import { Link } from "react-router-dom"

function Nav() {
  return (
    <div>
      {/* Inside of here I will have a list of Links to various components */}
      <ul>
        <li><Link to='/private/hotels'>Hotels</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/rooms'>Room management</Link></li>
        <li><Link to='/reservations'>Reservations</Link></li>
      </ul>
    </div>
  )
}

export default Nav