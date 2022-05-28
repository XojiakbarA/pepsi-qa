import {createSlice} from "@reduxjs/toolkit"
import {getCaps} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    error: null
}

export const capsSlice = createSlice({
    name: 'caps',
    initialState,
    extraReducers: {
        [getCaps.pending]: (state) => {
            state.loading = true
        },
        [getCaps.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getCaps.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export default capsSlice.reducer