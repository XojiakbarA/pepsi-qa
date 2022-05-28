import {createSlice} from "@reduxjs/toolkit"
import {getProducts} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    error: null
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.loading = true
        },
        [getProducts.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getProducts.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export default productsSlice.reducer