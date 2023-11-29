import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface FilterSearchState {
  value: string
}

export const initialState: FilterSearchState = {
  value: 'ALBUM',
}

export const filterSearchSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    updateSearchFilter: (state, action) => {
      state.value = action.payload
    },
    resetSearchFilterState: (state) => {
      state.value = initialState.value
    },
  },
})

export const { updateSearchFilter, resetSearchFilterState } =
  filterSearchSlice.actions
export const selectFilterSearch = (state: RootState) => state.searchFilter.value
export default filterSearchSlice.reducer
