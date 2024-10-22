import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../index";
import { updateCoefficient, updateStocks, updateUserMoney } from "../userDataSlice/userDataSlice";
import { selectedNonImoex } from "../nonImoexCompanySlice/nonImoexCompanySlice";
import { addCompanyToCart, removeCompanyFromCart } from "../cartSlice/cartSlice";
import { fetchInitialDataThunk } from "../initialDataSlice/thunk";

export const listenerMiddleware = createListenerMiddleware()
export const startAppListening = listenerMiddleware.startListening.withTypes<
	RootState,
	AppDispatch
>()

startAppListening({
	matcher: isAnyOf(
		updateCoefficient,
		updateStocks,
		updateUserMoney,
		selectedNonImoex,
		addCompanyToCart,
		removeCompanyFromCart,
	),
	// одно из четырех полей  type | actionCreator | matcher |predicate
	effect: async (action, listenerApi) => {
		const { userData, nonImoex: nonImoexCompany, cart, data } = listenerApi.getState()
		const imoexDataRaw = localStorage.getItem('imoexData');
		if (imoexDataRaw !== null) {
			const imoexData = JSON.parse(imoexDataRaw);
			imoexData.imoex = data.data!.imoex
			localStorage.setItem('imoexData', JSON.stringify(imoexData))
		}
		localStorage.setItem('userData', JSON.stringify(userData))
		localStorage.setItem('nonImoex', JSON.stringify(nonImoexCompany))
		localStorage.setItem('cart', JSON.stringify(cart))
	}
});

// слушатель для обновление при null = imoex или разная дата
startAppListening({
	matcher: isAnyOf(fetchInitialDataThunk.pending),
	effect: async (action, listenerApi) => {
		// console.log(listenerApi.getState(), 'middleware - fetchInitialDataThunk.pending');
		// const { cart, data } = listenerApi.getState();
		// const imoexDictionary = Object.fromEntries(data.imoex.map(s => [s.ticker, s]));
		// const keys = new Set(cart.map(item => item.ticker));
		// const imoex = data.imoex.filter(item => !keys.has(item.ticker));
		// const resultCart = cart.map(item => imoexDictionary[item.ticker] ? imoexDictionary[item.ticker] : item)
		// listenerApi.dispatch(imoexExcludingCartItem(imoex))
		// listenerApi.dispatch(updateItemCart(resultCart))
	}
});

