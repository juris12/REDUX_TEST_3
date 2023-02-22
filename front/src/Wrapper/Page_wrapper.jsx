import '../components/navbar/navbar.styles.scss'
import { PageNavbar } from '../components'

const Page_wrapper = ( Component ) => function HOC() {
  return (
    <>
    <PageNavbar/>
    <Component/>  
    </>
  )
}

export default Page_wrapper