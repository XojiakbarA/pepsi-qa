import {createSlice} from "@reduxjs/toolkit"
import {getFormats} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    error: null
}

export const formatsSlice = createSlice({
    name: 'formats',
    initialState,
    extraReducers: {
        [getFormats.pending]: (state) => {
            state.loading = true
        },
        [getFormats.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getFormats.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export default formatsSlice.reducer