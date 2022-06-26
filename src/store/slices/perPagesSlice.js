import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    singleTable: [20, 40, 60],
    multiTable: [6, 12, 18]
}

export const perPagesSlice = createSlice({
    name: 'perPages',
    initialState
})

export default perPagesSlice.reducer