import './StoreCatalog.styles.scss'
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useParams } from 'react-router-dom'


const StoreOuter = () => {
    const { haschild } = useParams()
    const location = useLocation()
    const content = (
            haschild == "w2fs" || true
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    )
    return content
}
const StoreCatalog = () => {
    return(
        <StoreOuter>
            ss
        </StoreOuter>
    )
}
export default StoreCatalog