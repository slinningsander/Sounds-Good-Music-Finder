import { createSlice } from '@reduxjs/toolkit'

export const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    selectedTags: [],
  },
  reducers: {
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload
    },
  },
})

export const { setSelectedTags } = tagsSlice.actions

export default tagsSlice.reducer
