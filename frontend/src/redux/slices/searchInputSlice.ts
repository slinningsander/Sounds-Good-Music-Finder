import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface SearchState {
  value: string
}

export const initialState: SearchState = {
  value: '',
}

export const searchInputSlice = createSlice({
  name: 'searchInput',
  initialState,
  reducers: {
    updateSearchInput: (state, action) => {
      state.value = action.payload
    },
    resetSearchInput: (state) => {
      state.value = initialState.value
    },
  },
})

export const { updateSearchInput, resetSearchInput } = searchInputSlice.actions
export const selectSearchInput = (state: RootState) => state.searchInput.value
export default searchInputSlice.reducer
