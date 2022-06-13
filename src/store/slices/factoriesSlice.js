import {createSlice} from "@reduxjs/toolkit"
import {getFactories} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    error: null
}

export const factoriesSlice = createSlice({
    name: 'factories',
    initialState,
    extraReducers: {
        [getFactories.pending]: (state) => {
            state.loading = true
        },
        [getFactories.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getFactories.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export default factoriesSlice.reducer