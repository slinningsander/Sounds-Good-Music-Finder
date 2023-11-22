import { configureStore } from '@reduxjs/toolkit'
import filterTagsReducer from './slices/tagFilterSlice'
import filterListenersReducer from './slices/filterListenersSlice'

const store = configureStore({
  reducer: {
    filterTags: filterTagsReducer,
    filterListeners: filterListenersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
