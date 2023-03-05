import './LandingPage.styles.scss'
import { StoreSidebar } from '../../components'
const LandingPage = () => {
  const fff = [1,2,3,4,5,6,7,8,9]
  return (
    <div className='outer_store_comp'>
      <div className='stor_cat'>
        <StoreSidebar/>
      </div>
    {fff.map((val)=>(
      <h6 key={val} className='LandingPage'>LandingPage {val}</h6>
    ))}
    </div>
  )
}

export default LandingPage