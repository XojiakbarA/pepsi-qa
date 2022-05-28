import {createSlice} from "@reduxjs/toolkit"
import {getContainerSuppliers} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    error: null
}

export const containerSuppliersSlice = createSlice({
    name: 'containerSupplier',
    initialState,
    extraReducers: {
        [getContainerSuppliers.pending]: (state) => {
            state.loading = true
        },
        [getContainerSuppliers.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getContainerSuppliers.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export default containerSuppliersSlice.reducer