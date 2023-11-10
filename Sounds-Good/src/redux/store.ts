import { configureStore } from '@reduxjs/toolkit'
import tagsReducer from './reducers/tagReducers.ts'

export const store = configureStore({
  reducer: {
    tags: tagsReducer,
  },
})

export default store
