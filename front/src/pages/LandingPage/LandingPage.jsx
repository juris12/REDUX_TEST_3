import './LandingPage.styles.scss'
const LandingPage = () => {
  const fff = [1,2,3,4,5,6,7,8,9,0,1,2,34,5,6,55,53,6,2,77,25,74,45,23,3]
  return (
    <>
    {fff.map((val)=>(
      <h6 className='LandingPage'>LandingPage {val}</h6>
    ))}
    </>
  )
}

export default LandingPage