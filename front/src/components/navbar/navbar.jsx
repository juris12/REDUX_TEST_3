import { NavLink, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import './navbar.styles.scss'
import useAuth from '../../hooks/useAuth'
import { BiLogIn } from 'react-icons/bi'
import { useSendLogoutMutation } from '../../pages/auth/authApiSlice'
import { useEffect } from 'react';


const Navbar = () => {
  const { username } = useAuth()
  const navigate = useNavigate()
  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const conmponent = (
    <nav className='flex navbar'>
          <ul className='flex navbar_center'>
            <li>
              <NavLink to="/dash" className='navbar_logo'>
                <img src="https://picsum.photos/200" alt="" />
              </NavLink>
            </li>
            <li><NavLink to="/">Katalogs<MdKeyboardArrowDown/></NavLink></li>
            <li><NavLink to="/dash/users">klienti</NavLink></li>
            <li><NavLink to="/dash/catalog">kategorijas</NavLink></li>
            <li><NavLink to="/dash/categorys">Aprīkojums</NavLink></li>
          </ul>
          <ul className='flex navbar_right'>
            <li className='flex nav_profile'>
              <span>{username}</span>
              <MdKeyboardArrowDown/>
            </li>
            <li className='flex' onClick={sendLogout}>
              <BiLogIn/>
              &nbsp;Iziet
            </li>
          </ul>
    </nav>
  )
  return conmponent
}

export default Navbar