import { configureStore } from '@reduxjs/toolkit'
import { initialDataSlice } from './initialDataSlice/initialDataSlice'
import { fetchInitialDataThunk } from './initialDataSlice/thunk';
import { userDataSlice } from './userDataSlice/userDataSlice';

export const store = configureStore({
	reducer: {
		data: initialDataSlice.reducer,
		userData: userDataSlice.reducer,
	},
})

store.dispatch(fetchInitialDataThunk())

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
