import {Route, Routes} from "react-router"
import MainLayout from "./components/layouts/MainLayout"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import PhysicalChemicalAnalyses from "./pages/PhysicalChemicalAnalyses"
import RemovalTorque from "./pages/RemovalTorque"
import SectionWeight from "./pages/SectionWeight"

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="/physical-chemical-analyses" element={<PhysicalChemicalAnalyses/>}/>
                <Route path="/removal-torque" element={<RemovalTorque/>}/>
                <Route path="/section-weight" element={<SectionWeight/>}/>
            </Route>
            <Route path="/auth" element={<Auth/>}/>
        </Routes>
    )
}

export default App
