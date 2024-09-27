import { configureStore } from '@reduxjs/toolkit'
import { dataSlice } from './dataSlice/dataSlice'
import { fetchInitialDataThunk } from './dataSlice/thunk';
import { userDataSlice } from './userDataSlice/userDataSlice';

export const store = configureStore({
	reducer: {
		data: dataSlice.reducer,
		userData: userDataSlice.reducer, // хранится коэффициент и сумма веса компании.
	},
})

store.dispatch(fetchInitialDataThunk())

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
