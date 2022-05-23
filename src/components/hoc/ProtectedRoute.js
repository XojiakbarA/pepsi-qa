import {Backdrop, CircularProgress} from "@mui/material"
import {Navigate, Outlet} from "react-router"
import {useSelector} from "react-redux"
import {userSelector} from "../../store/selectors"

const ProtectedRoute = () => {

    const {auth, getLoading} = useSelector(userSelector)

    if (getLoading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    }
    if (!auth) {
        return <Navigate to="/auth"/>
    }

    return <Outlet/>
}

export default ProtectedRoute