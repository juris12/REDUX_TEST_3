import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import { Navbar } from '../components'

const DashLayout = () => {
    return (
        <>
        <Navbar/>
        <div className='component_outer'>
            <Outlet />
        </div>
        </>
    )
    return (
        <>
            <DashHeader />
            <div className="dash-container">
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}
export default DashLayout