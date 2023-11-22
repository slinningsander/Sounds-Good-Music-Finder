import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface FilterDurationState {
  value: number[]
}

const initialState: FilterDurationState = {
  value: [0, 600],
}

export const filterDurationSlice = createSlice({
  name: 'filterDuration',
  initialState,
  reducers: {
    updateDurationFilter: (state, action) => {
      state.value = action.payload
    },
    resetDurationState: (state) => {
      state.value = initialState.value
    },
  },
})

export const { updateDurationFilter, resetDurationState } =
  filterDurationSlice.actions
export const selectFilterDuration = (state: RootState) =>
  state.filterDuration.value
export default filterDurationSlice.reducer
