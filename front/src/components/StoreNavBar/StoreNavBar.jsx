import './StoreNavBar.styles.scss'
import { NavLink } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RxPerson } from 'react-icons/rx'
import { RiShoppingCartLine } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState, useEffect } from 'react';

const StoreNavBar = () => {
  const [scrol, setscrol] = useState(false)
  useEffect(() => {
    document.addEventListener('scroll', handleScrollToElement);
    return () => window.removeEventListener('scroll', handleScrollToElement);
  });
  const handleScrollToElement = () => {
      if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
        setscrol(true)
      }else{
        setscrol(false)
      }
  }
  return (
    <header>
        <div className='store_midle_outer_outer'>
          <div className='store_midle_outer'>
            <div className='store_midle_left'>
              <button className='store_mid_menu'>
                <GiHamburgerMenu/>
              </button>
              <NavLink to="/" className='navbar_logo'>
                  {/* <img src="https://picsum.photodds/200" alt="Store101" /> */}
                  Store101
              </NavLink>
              <div className='store_midle_serach'>
                <form>
                  <input type="text" name="serach" id="serach_bar" placeholder='Meklējiet preci...'/>
                  <button><HiOutlineSearch/></button>
                </form>
              </div>
            </div>
            <div className='store_midle_right'>
              {true?
                <div className='store_midle_login'>
                <RxPerson/>
                <span>{"Andris Berziņš"}</span>
                <MdKeyboardArrowDown/>
              </div>:
              <div className='store_midle_login'>
                <RxPerson/>
                <NavLink to="/">Ienākt</NavLink>/
                <NavLink to="/">Reģistrēties</NavLink>
              </div>
              }
              <button>
                <RiShoppingCartLine/>
              </button>
            </div>
          </div>
        </div>
        <div className='store_down_outer_outer'>
          <div className={scrol ? "store_down_outer_active":"store_down_outer"}>
            <NavLink to="/">Piegāde</NavLink>
            <NavLink to="/">Akcija</NavLink>
            <NavLink to="/">Biznesam</NavLink>
            <NavLink to="/">Speciālie pasūtījumi</NavLink>
          </div>
        </div>
    </header>
  )
}

export default StoreNavBar