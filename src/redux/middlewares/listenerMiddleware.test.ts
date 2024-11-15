import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../index";
import { createUserDataListenerMiddleware } from "./listenerMiddleware";
import { userDataSlice } from "../userDataSlice/userDataSlice";
import { localStorageMock } from "../../test/localStorageMock";
import { nonImoexSlice } from "../nonImoexSlice/nonImoexSlice";
import { cartSlice } from "../cartSlice/cartSlice";

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe('Тест middleware', () => {
	test('updateCoefficient данные в localStorage обновляются', () => {
		const data = { ticker: "X", count: 5 }
		const listenerMiddleware = createUserDataListenerMiddleware();
		const store = configureStore({
			reducer: rootReducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().prepend(listenerMiddleware.middleware),
		});
		store.dispatch(userDataSlice.actions.updateCoefficient(data));
		const result = JSON.parse(localStorageMock.getItem('userData')!).coefficients
		expect(result).toStrictEqual({ X: 5 })
	});
	test('updateStocks данные в localStorage обновляются', () => {
		const data = { ticker: "X", count: 15 }
		const listenerMiddleware = createUserDataListenerMiddleware();
		const store = configureStore({
			reducer: rootReducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().prepend(listenerMiddleware.middleware),
		});
		store.dispatch(userDataSlice.actions.updateStocks(data));
		const result = JSON.parse(localStorageMock.getItem('userData')!).stocks
		expect(result).toStrictEqual({ X: 15 });
	});
	test('updateUserMoney данные в localStorage обновляются', () => {
		const data = 1;
		const listenerMiddleware = createUserDataListenerMiddleware();
		const store = configureStore({
			reducer: rootReducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().prepend(listenerMiddleware.middleware),
		});
		store.dispatch(userDataSlice.actions.updateUserMoney(data));
		const result = JSON.parse(localStorageMock.getItem('userData')!).moneyUser;
		expect(result).toBe(data);
	});
	test('selectedNonImoex данные в localStorage обновляются', () => {
		const data = { ticker: "X", shortname: 'Компания X', weight: 5 }
		const listenerMiddleware = createUserDataListenerMiddleware();
		const store = configureStore({
			reducer: rootReducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().prepend(listenerMiddleware.middleware),
		});
		store.dispatch(nonImoexSlice.actions.selectedNonImoex(data));
		const result = JSON.parse(localStorageMock.getItem('nonImoex')!);
		expect(result).toStrictEqual([data]);
	});
	test('addCompanyToCart данные в localStorage обновляются', () => {
		const data = 'AAAA'
		const listenerMiddleware = createUserDataListenerMiddleware();
		const store = configureStore({
			reducer: rootReducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().prepend(listenerMiddleware.middleware),
		});
		store.dispatch(cartSlice.actions.addCompanyToCart(data));
		const result = JSON.parse(localStorageMock.getItem('cart')!);
		expect(result).toStrictEqual([data]);
	});
	test('removeCompanyFromCart данные в localStorage обновляются', () => {
		const data = 'AAAA'
		const listenerMiddleware = createUserDataListenerMiddleware();
		const store = configureStore({
			reducer: rootReducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().prepend(listenerMiddleware.middleware),
		});
		store.dispatch(cartSlice.actions.removeCompanyFromCart(data));
		const result = JSON.parse(localStorageMock.getItem('cart')!);
		expect(result).toStrictEqual([]);
	});
});
