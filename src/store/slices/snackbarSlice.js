import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: "",
    open: false,
    color: "success"
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        setSnackbar: (state, action) => {
            state.data = action.payload.data
            state.open = action.payload.open
            state.severity = action.payload.color
        }
    }
})

export const { setSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer