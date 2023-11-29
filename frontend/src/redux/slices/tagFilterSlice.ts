import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface FilterTagsState {
  value: string[]
}

export const initialState: FilterTagsState = {
  value: [],
}

export const filterTagsSlice = createSlice({
  name: 'filterTags',
  initialState,
  reducers: {
    updateTags: (state, action) => {
      state.value = action.payload
    },
    resetTagFilterState: (state) => {
      state.value = initialState.value
    },
  },
})

export const { updateTags, resetTagFilterState } = filterTagsSlice.actions
export const selectFilterTags = (state: RootState) => state.filterTags.value
export default filterTagsSlice.reducer
