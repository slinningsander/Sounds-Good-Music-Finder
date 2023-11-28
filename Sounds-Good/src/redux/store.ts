import { configureStore } from '@reduxjs/toolkit'
import filterTagsReducer from './slices/tagFilterSlice'
import filterListenersReducer from './slices/filterListenersSlice'
import sortingDirectionReducer from './slices/sortingDirectionSlice'
import filterDurationReducer from './slices/filterDurationSlice'
import searchInputReducer from './slices/searchInputSlice'

const store = configureStore({
  reducer: {
    filterTags: filterTagsReducer,
    filterListeners: filterListenersReducer,
    sortingDirection: sortingDirectionReducer,
    filterDuration: filterDurationReducer,
    searchInput: searchInputReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
