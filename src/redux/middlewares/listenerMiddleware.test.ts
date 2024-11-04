import { configureStore } from "@reduxjs/toolkit";
// import reducer, { addCompanyToCart, cartSlice, removeCompanyFromCart } from "../cartSlice/cartSlice";
import { rootReducer } from "../index";
import { createUserDataListenerMiddleware } from "./listenerMiddleware";
import { userDataSlice } from "../userDataSlice/userDataSlice";

test('Тест middleware', () => {

	const listenerMiddleware = createUserDataListenerMiddleware();

	const store = configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().prepend(listenerMiddleware.middleware),
	});

	store.dispatch(userDataSlice.actions.updateCoefficient({ ticker: "X", count: 5 }));


})