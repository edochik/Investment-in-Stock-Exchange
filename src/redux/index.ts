import { configureStore } from '@reduxjs/toolkit'
import { initialDataSlice } from './initialDataSlice/initialDataSlice'
import { fetchInitialDataThunk } from './initialDataSlice/thunk';
import { userDataSlice } from './userDataSlice/userDataSlice';
import { selectedCompanySlice } from './selectedCompanySlice/selectedCompanySlice';
import { listenerMiddleware } from './listenerMiddleware';

export const store = configureStore({
	reducer: {
		data: initialDataSlice.reducer,
		userData: userDataSlice.reducer,
		selectedCompany: selectedCompanySlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

store.dispatch(fetchInitialDataThunk())


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

