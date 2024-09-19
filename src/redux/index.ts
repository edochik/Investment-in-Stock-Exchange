import { configureStore } from '@reduxjs/toolkit'
import { dataSlice } from './dataSlice/dataSlice'
import { fetchInitialDataThunk } from './dataSlice/thunk';
import { stocksUserSlice } from './stocksUserSlice/stocksUserSlice';

export const store = configureStore({
	reducer: {
		data: dataSlice.reducer,
		stocksUser: stocksUserSlice.reducer,
	},
})

store.dispatch(fetchInitialDataThunk());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
