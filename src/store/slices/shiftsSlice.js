import {createSlice} from "@reduxjs/toolkit"
import {createShift, deleteShift, editShiftValues, getShifts} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    createLoading: false,
    updateValueLoading: false,
    deleteLoading: false,
    error: null,
}

export const shiftsSlice = createSlice({
    name: 'shifts',
    initialState,
    reducers: {
        setShiftValues: (state, { payload }) => {
            const shift = state.data.find(shift => shift.id === payload.id)
            shift.shift_values[payload.index]['value'] = payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(getShifts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getShifts.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
        builder.addCase(getShifts.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })

        builder.addCase(createShift.pending, (state) => {
            state.createLoading = true
        })
        builder.addCase(createShift.fulfilled, (state, action) => {
            state.data = state.data.concat(action.payload)
            state.createLoading = false
        })
        builder.addCase(createShift.rejected, (state, action) => {
            state.error = action.payload
            state.createLoading = false
        })

        builder.addCase(editShiftValues.pending, (state) => {
            state.updateValueLoading = true
        })
        builder.addCase(editShiftValues.fulfilled, (state, action) => {
            state.updateValueLoading = false
        })
        builder.addCase(editShiftValues.rejected, (state, action) => {
            state.error = action.payload
            state.updateValueLoading = false
        })

        builder.addCase(deleteShift.pending, (state) => {
            state.deleteLoading = true
        })
        builder.addCase(deleteShift.fulfilled, (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload.id)
            state.deleteLoading = false
        })
        builder.addCase(deleteShift.rejected, (state, action) => {
            state.error = action.payload
            state.deleteLoading = false
        })
    }
})

export const { setShiftValues } = shiftsSlice.actions

export default shiftsSlice.reducer