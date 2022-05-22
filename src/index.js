import React from "react"
import ReactDOM from "react-dom/client"
import {CssBaseline, ThemeProvider} from "@mui/material"
import {BrowserRouter} from "react-router-dom"
import { Provider } from "react-redux"
import App from "./App"
import {theme} from "./utils/theme"
import {store} from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <App/>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
