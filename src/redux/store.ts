import { configureStore } from '@reduxjs/toolkit'
import imoexSlicer, { fetchDataImoex } from './slicer/imoexSlicer'
import securitiesSlicer, { fetchDataSecurities } from './slicer/securitiesSlicer'

export const store = configureStore({
	reducer: {
		imoex: imoexSlicer,
		securities: securitiesSlicer,
	},
})

store.dispatch(fetchDataImoex())
store.dispatch(fetchDataSecurities())
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
