import { configureStore } from '@reduxjs/toolkit'
import filterTagsReducer from './slices/tagFilterSlice'

const store = configureStore({
  reducer: {
    filterTags: filterTagsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
