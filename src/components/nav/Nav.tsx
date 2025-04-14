/*import { Link } from "react-router-dom"

function Nav() {
  return (
    <div>
      {/* Inside of here I will have a list of Links to various components }
      <ul>
        <li><Link to='/private/hotels'>Hotels</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/rooms'>Rooms</Link></li>
        <li><Link to='/reservations'>Reservations</Link></li>
      </ul>
    </div>
  )
}

export default Nav
*/
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImage from "/src/assets/logo.png"; // Update this path to match your project structure
import "./Nav.css";
import { authContext } from "../../App"
 

function Nav() {
  const roleReference = useContext(authContext)
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle window resize to close mobile menu when switching to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    // Add scroll listener for navbar background change
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logoImage} alt="Logo" className="logo-image" width="30px" />
        </Link>

        {/* Hamburger menu for mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Navigation menu */}
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/private/hotels" className="nav-link" onClick={closeMenu}>
              Hotels
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" onClick={closeMenu}>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link" onClick={closeMenu}>  
              Register
            </Link>
          </li>
          {roleReference?.role === "ADMIN" || roleReference?.role === "OWNER" &&
          <li className="nav-item">
            <Link to="/rooms" className="nav-link" onClick={closeMenu}>
              Rooms
            </Link>
          </li>}
          <li className="nav-item">
            <Link to="/reservations" className="nav-link" onClick={closeMenu}>
              Reservations
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;