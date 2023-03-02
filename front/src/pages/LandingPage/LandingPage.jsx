import './LandingPage.styles.scss'
import { StoreSidebar } from '../../components'
const LandingPage = () => {
  const fff = [1,2,3,4,5,6,7,8,9]
  return (
    <>
    <StoreSidebar/>
    {fff.map((val)=>(
      <h6 key={val} className='LandingPage'>LandingPage {val}</h6>
    ))}
    </>
  )
}

export default LandingPage