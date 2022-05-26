import {Route, Routes} from "react-router"
import MainLayout from "./components/layouts/MainLayout"
import ProtectedRoute from "./components/hoc/ProtectedRoute"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import PhysicalChemicalAnalyses from "./pages/PhysicalChemicalAnalyses"
import RemovalTorqueAnalyses from "./pages/RemovalTorqueAnalyses"
import SectionWeightAnalyses from "./pages/SectionWeightAnalyses"
import MySnackbar from "./components/common/MySnackbar"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {getUser} from "./store/actionCreators"

function App() {

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getUser())

    }, [dispatch])

    return (
        <>
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route element={<ProtectedRoute/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/physical-chemical-analyses" element={<PhysicalChemicalAnalyses/>}/>
                    <Route path="/removal-torque-analyses" element={<RemovalTorqueAnalyses/>}/>
                    <Route path="/section-weight-analyses" element={<SectionWeightAnalyses/>}/>
                </Route>
            </Route>
            <Route path="/auth" element={<Auth/>}/>
        </Routes>
        <MySnackbar/>
        </>
    )
}

export default App
