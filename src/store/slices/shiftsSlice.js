import {createSlice} from "@reduxjs/toolkit"
import {createShift, getShifts} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    error: null
}

export const shiftsSlice = createSlice({
    name: 'shifts',
    initialState,
    extraReducers: {
        [getShifts.pending]: (state) => {
            state.loading = true
        },
        [getShifts.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getShifts.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        [createShift.pending]: (state) => {
            state.loading = true
        },
        [createShift.fulfilled]: (state, action) => {
            state.data = state.data.concat(action.payload)
            state.loading = false
        },
        [createShift.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
    }
})

export default shiftsSlice.reducer