import { configureStore } from '@reduxjs/toolkit'
import AppReducer from './AppSlice'
import ProjectsReducer from './ProjectsSlice'
import ArticlesReducer from './ArticleSlice'

const store = configureStore({
  reducer: {
    app: AppReducer,
    projects: ProjectsReducer,
    articles: ArticlesReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;