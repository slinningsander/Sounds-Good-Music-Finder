import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface FilterListenersState {
  value: number[]
}

const initialState: FilterListenersState = {
  value: [0, 6500000],
}

export const filterListenersSlice = createSlice({
  name: 'filterListeners',
  initialState,
  reducers: {
    updateListenersFilter: (state, action) => {
      state.value = action.payload
    },
    resetListenerState: (state) => {
      state.value = []
    },
  },
})

export const { updateListenersFilter, resetListenerState } =
  filterListenersSlice.actions
export const selectFilterListeners = (state: RootState) =>
  state.filterListeners.value
export default filterListenersSlice.reducer
