import {Navigate, Outlet} from "react-router"
import MyBackdrop from "../common/MyBackdrop"
import {useSelector} from "react-redux"
import {userSelector} from "../../store/selectors"

const ProtectedRoute = () => {

    const {auth, getLoading} = useSelector(userSelector)

    if (getLoading) {
        return <MyBackdrop/>
    }
    if (!auth) {
        return <Navigate to="/auth"/>
    }

    return <Outlet/>
}

export default ProtectedRoute