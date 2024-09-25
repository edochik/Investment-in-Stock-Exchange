import { configureStore } from '@reduxjs/toolkit'
import { dataSlice } from './dataSlice/dataSlice'
import { fetchInitialDataThunk } from './dataSlice/thunk';
import { sumStocksSlice } from './sumStocksSlice/sumStocksSlice';
import { coefficientSlice } from './coefficientSlice/coefficientSlice';

export const store = configureStore({
	reducer: {
		data: dataSlice.reducer,
		sumStocks: sumStocksSlice.reducer,
		coefficient: coefficientSlice.reducer,
	},
})

store.dispatch(fetchInitialDataThunk());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
