import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { initialDataSlice } from './initialDataSlice/initialDataSlice'
import { fetchInitialDataThunk } from './initialDataSlice/thunk';
import { userDataSlice } from './userDataSlice/userDataSlice';
import { nonImoexSlice } from './nonImoexCompanySlice/nonImoexCompanySlice';
import { listenerMiddleware } from './middlewares/listenerMiddleware';
import { cartSlice } from './cartSlice/cartSlice';

const rootReducer = combineReducers({
	data: initialDataSlice.reducer,
	userData: userDataSlice.reducer,
	nonImoex: nonImoexSlice.reducer,
	cart: cartSlice.reducer
})

const _setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().prepend(listenerMiddleware.middleware),
	})
};

export type AppStore = ReturnType<typeof _setupStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


export const setupStore = (preloadedState?: Partial<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().prepend(listenerMiddleware.middleware),
	})
};

export const store = setupStore()
store.dispatch(fetchInitialDataThunk())






