import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface SortingState {
  value: string
}

const initialState: SortingState = {
  value: 'ASC',
}

export const sortingDirectionSlice = createSlice({
  name: 'sortingDirection',
  initialState,
  reducers: {
    updateSortingDirection: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateSortingDirection } = sortingDirectionSlice.actions
export const selectSortingDirection = (state: RootState) =>
  state.sortingDirection.value
export default sortingDirectionSlice.reducer
