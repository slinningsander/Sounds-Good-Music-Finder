import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface FilterListenersState {
  value: number[]
}

const initialState: FilterListenersState = {
  value: [],
}

export const filterListenersSlice = createSlice({
  name: 'filterListeners',
  initialState,
  reducers: {
    updateListenersFilter: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateListenersFilter } = filterListenersSlice.actions
export const selectFilterTags = (state: RootState) =>
  state.filterListeners.value
export default filterListenersSlice.reducer
