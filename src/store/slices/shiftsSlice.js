import {createSlice} from "@reduxjs/toolkit"
import {createShift, editShiftValues, getShifts} from "../actionCreators"

const initialState = {
    data: [],
    loading: false,
    createLoading: false,
    updateValueLoading: false,
    error: null,
    mustEdit: []
}

export const shiftsSlice = createSlice({
    name: 'shifts',
    initialState,
    reducers: {
        setShiftValues: (state, { payload }) => {
            const shift = state.data.find(shift => shift.id === payload.id)
            shift.shift_values[payload.values[0].index] = payload.values[0].value
            const findedShift = state.mustEdit.find(item => item.id === payload.id)

            if (findedShift) {
                const findedIndex = findedShift.values.find(item => item.index === payload.values[0].index)
                if (findedIndex) {
                    findedIndex.value = payload.values[0].value
                } else {
                    findedShift.values.push(payload.values[0])
                }
            } else {
                state.mustEdit.push(payload)
            }
        },
        setMustEdit: (state, { payload }) => {
            state.mustEdit = payload
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
    }
})

export const { setShiftValues, setMustEdit } = shiftsSlice.actions

export default shiftsSlice.reducer