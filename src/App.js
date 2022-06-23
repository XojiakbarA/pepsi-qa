import {Route, Routes} from "react-router"
import MainLayout from "./components/layouts/MainLayout"
import ProtectedRoute from "./components/hoc/ProtectedRoute"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import SyrupAnalyses from "./pages/SyrupAnalyses"
import PhysicalChemicalAnalyses from "./pages/PhysicalChemicalAnalyses"
import RemovalTorqueAnalyses from "./pages/RemovalTorqueAnalyses"
import SectionWeightAnalyses from "./pages/SectionWeightAnalyses"
import WaterAnalyses from "./pages/WaterAnalyses"
import SecureSealTests from "./pages/SecureSealTests"
import BurstTests from "./pages/BurstTests"
import ShiftSchedule from "./pages/ShiftSchedule"
import MySnackbar from "./components/common/MySnackbar"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {getCaps,getContainerSuppliers, getFactories, getFormats, getLines, getProducts, getShiftModes, getTanks, getUser, getUsers} from "./store/actionCreators"

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
        dispatch(getProducts())
        dispatch(getLines())
        dispatch(getFormats())
        dispatch(getContainerSuppliers())
        dispatch(getCaps())
        dispatch(getUsers())
        dispatch(getTanks())
        dispatch(getShiftModes())
        dispatch(getFactories())
    }, [dispatch])

    return (
        <>
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route element={<ProtectedRoute/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/syrup-analyses" element={<SyrupAnalyses/>}/>
                    <Route path="/physical-chemical-analyses" element={<PhysicalChemicalAnalyses/>}/>
                    <Route path="/removal-torque-analyses" element={<RemovalTorqueAnalyses/>}/>
                    <Route path="/section-weight-analyses" element={<SectionWeightAnalyses/>}/>
                    <Route path="/water-analyses" element={<WaterAnalyses/>}/>
                    <Route path="/secure-seal-tests" element={<SecureSealTests/>}/>
                    <Route path="/burst-tests" element={<BurstTests/>}/>
                    <Route path="/shift-schedule" element={<ShiftSchedule/>}/>
                </Route>
            </Route>
            <Route path="/auth" element={<Auth/>}/>
        </Routes>
        <MySnackbar/>
        </>
    )
}

export default App
