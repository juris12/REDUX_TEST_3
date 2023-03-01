import { Outlet } from 'react-router-dom'
import { StoreNavBar } from '../components'

const StoreWrapper = () => {
    return (
        <>
        <StoreNavBar/>
        <div style={{paddingTop:"120px",margin:"auto",maxWidth:"1600px"}}>
            <Outlet />
        </div>
        </>
    )
}
export default StoreWrapper