import {createSlice} from "@reduxjs/toolkit"
import {getShiftModes} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    error: null
}

export const shiftModesSlice = createSlice({
    name: 'shiftModes',
    initialState,
    extraReducers: {
        [getShiftModes.pending]: (state) => {
            state.loading = true
        },
        [getShiftModes.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getShiftModes.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export default shiftModesSlice.reducer