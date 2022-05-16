import {Route, Routes} from "react-router"
import MainLayout from "./components/layouts/MainLayout"
import Auth from "./pages/Auth"
import Home from "./pages/Home"

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}/>
            </Route>
            <Route path="/auth" element={<Auth/>}/>
        </Routes>
    )
}

export default App
