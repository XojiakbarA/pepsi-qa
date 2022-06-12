import {createSlice} from "@reduxjs/toolkit"
import {getTanks} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    error: null
}

export const tanksSlice = createSlice({
    name: 'tanks',
    initialState,
    extraReducers: {
        [getTanks.pending]: (state) => {
            state.loading = true
        },
        [getTanks.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getTanks.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export default tanksSlice.reducer