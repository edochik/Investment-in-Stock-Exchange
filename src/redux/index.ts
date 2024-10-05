import { configureStore } from '@reduxjs/toolkit'
import { initialDataSlice } from './initialDataSlice/initialDataSlice'
import { fetchInitialDataThunk } from './initialDataSlice/thunk';
import { userDataSlice } from './userDataSlice/userDataSlice';
import { selectedCompanySlice } from './selectedCompanySlice/selectedCompanySlice';

// типизиация 
const saveToLocalStorageMiddleware = (key: string) => (storeApi) => (next) => (action) => {
	const prevState = storeApi.getState();
	const result = next(action);
	const nextState = storeApi.getState();
	if (prevState.userData !== nextState.userData) {
		localStorage.setItem(key, JSON.stringify(nextState.userData))
	}
	return result
}

const dataMiddleware = saveToLocalStorageMiddleware('userData');

export const store = configureStore({
	reducer: {
		data: initialDataSlice.reducer,
		userData: userDataSlice.reducer,
		selectedCompany: selectedCompanySlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dataMiddleware),
})

store.dispatch(fetchInitialDataThunk())


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

