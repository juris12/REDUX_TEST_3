import { Navbar } from '../components'

const AppWrap = ( Component ) => function HOC() {
  return (
    <>
      <Navbar/>
      <Component/>  
    </>
  )
}

export default AppWrap