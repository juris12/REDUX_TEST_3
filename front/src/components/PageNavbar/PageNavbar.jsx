import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from 'react'
import { BsPerson } from 'react-icons/bs';
import './PageNavbar.styles.scss'
import logoImage from '../../img/background.jpg'
const Page_navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef();

  const handleClickOutside = e => {
      if (!menuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });
  return (
    <header>
      <div className="page_navbar_outer">
        <div className="page_navbar">
          <div className="page_navbar-left">
              <Link to='/'>
                <img src={logoImage} alt="" />
              </Link>
              <div className="nav_menu_iner" onClick={() => setMobileOpen(true)}>
                <div className="menu_bar1"></div>
                <div className="menu_bar2"></div>
                <div className="menu_bar3"></div>
            </div>
          </div>
          <nav className="page_navbar-center">
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>Shop</Link></li>
                <li><Link to='/'>Flavors</Link></li>
                <li><Link to='/'>Blog</Link></li>
                <li><Link to='/'>Contact us</Link></li>
              </ul>
          </nav>
          <button className="page_navbar-right">
              <BsPerson/>
          </button>
        </div>
      </div>
      <div className={`mobile_menu_outer ${mobileOpen && 'active_mmobile'}`}>
        <div ref={menuRef} className={`mobile_menu ${mobileOpen && 'active_mmobile'}`}>
          <button>
            <div className="nav_menu_iner_white">
                <div className="menu_bar1"></div>
                <div className="menu_bar2"></div>
                <div className="menu_bar3"></div>
            </div>
            <span>MENU</span>
          </button>
          <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/'>Shop</Link></li>
              <li><Link to='/'>Flavors</Link></li>
              <li><Link to='/'>Blog</Link></li>
              <li><Link to='/'>Contact us</Link></li>
          </ul>
          <button onClick={() => setMobileOpen(false)}>CLOSE</button>
        </div>
      </div>
    </header>
  )
}

export default Page_navbar