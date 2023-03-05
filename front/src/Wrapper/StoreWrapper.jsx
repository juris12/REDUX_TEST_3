import { Outlet } from 'react-router-dom'
import { StoreNavBar } from '../components'

const StoreWrapper = () => {
    return (
        <>
        <StoreNavBar/>
        <div style={{paddingTop:"128px",margin:"auto",maxWidth:"1660px"}}>
            <Outlet />
        </div>
        </>
    )
}
export default StoreWrapper