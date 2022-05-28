import {createSlice} from "@reduxjs/toolkit"
import {getLines} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    error: null
}

export const linesSlice = createSlice({
    name: 'lines',
    initialState,
    extraReducers: {
        [getLines.pending]: (state) => {
            state.loading = true
        },
        [getLines.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getLines.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export default linesSlice.reducer