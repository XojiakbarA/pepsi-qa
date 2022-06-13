import { configureStore } from "@reduxjs/toolkit"
import userReducer from './slices/userSlice'
import snackbarReducer from "./slices/snackbarSlice"
import productReducer from "./slices/productsSlice"
import lineReducer from "./slices/linesSlice"
import formatReducer from "./slices/formatsSlice"
import containerSupplierReducer from "./slices/containerSuppliersSlice"
import capReducer from "./slices/capsSlice"
import usersReducer from "./slices/usersSlice"
import perPagesReducer from "./slices/perPagesSlice"
import tanksReducer from "./slices/tanksSlice"
import shiftModesReducer from "./slices/shiftModesSlice"
import factoriesReducer from "./slices/factoriesSlice"
import shiftsReducer from "./slices/shiftsSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        snackbar: snackbarReducer,
        products: productReducer,
        lines: lineReducer,
        formats: formatReducer,
        containerSuppliers: containerSupplierReducer,
        caps: capReducer,
        users: usersReducer,
        tanks: tanksReducer,
        perPages: perPagesReducer,
        shiftModes: shiftModesReducer,
        factories: factoriesReducer,
        shifts: shiftsReducer
    }
})