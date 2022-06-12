import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    singleTable: [10, 25, 50],
    multiTable: [6, 12, 18]
}

export const perPagesSlice = createSlice({
    name: 'perPages',
    initialState
})

export default perPagesSlice.reducer