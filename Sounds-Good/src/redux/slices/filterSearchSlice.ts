import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface FilterSearchState {
  value: string
}

const initialState: FilterSearchState = {
  value: 'ALBUM',
}

export const filterSearchSlice = createSlice({
  name: 'filterSearch',
  initialState,
  reducers: {
    updateSearchFilter: (state, action) => {
      state.value = action.payload
    },
    resetSearchState: (state) => {
      state.value = initialState.value
    },
  },
})

export const { updateSearchFilter, resetSearchState } =
  filterSearchSlice.actions
export const selectFilterSearch = (state: RootState) => state.filterSearch.value
export default filterSearchSlice.reducer
