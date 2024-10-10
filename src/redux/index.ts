import { configureStore } from '@reduxjs/toolkit'
import { initialDataSlice } from './initialDataSlice/initialDataSlice'
import { fetchInitialDataThunk } from './initialDataSlice/thunk';
import { userDataSlice } from './userDataSlice/userDataSlice';
import { nonImoexCompanySlice } from './nonImoexCompanySlice/nonImoexCompanySlice';
import { listenerMiddleware } from './middlewares/listenerMiddleware';
import { cartSlice } from './cartSlice/cartSlice';

export const store = configureStore({
	reducer: {
		data: initialDataSlice.reducer,
		userData: userDataSlice.reducer,
		nonImoexCompany: nonImoexCompanySlice.reducer,
		cart: cartSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

store.dispatch(fetchInitialDataThunk())


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

