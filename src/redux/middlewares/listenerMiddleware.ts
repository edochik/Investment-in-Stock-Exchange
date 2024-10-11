import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../index";
import { updateCoefficients, updateStocks, updateUserMoney } from "../userDataSlice/userDataSlice";
import { addedNonImoex, removedNonImoex, selectedNonImoex } from "../nonImoexCompanySlice/nonImoexCompanySlice";
import { addedImoex, removedImoex } from "../initialDataSlice/initialDataSlice";
import { addCompanyCart, removeCompanyCart } from "../cartSlice/cartSlice";
import { fetchInitialDataThunk } from "../initialDataSlice/thunk";

export const listenerMiddleware = createListenerMiddleware()
export const startAppListening = listenerMiddleware.startListening.withTypes<
	RootState,
	AppDispatch
>()

startAppListening({
	matcher: isAnyOf(
		updateCoefficients, //userData function => local
		updateStocks, //userData function => local
		updateUserMoney, //userData function => local
		selectedNonImoex, // nonImoex function => local
		addedNonImoex,// nonImoex function ??
		removedNonImoex,// nonImoex function ??
		addedImoex, //imoex function 
		removedImoex,//imoex function
		addCompanyCart, //cart function
		removeCompanyCart, //cart function
		fetchInitialDataThunk.pending,
		fetchInitialDataThunk.fulfilled
	),
	// одно из четырех полей  type | actionCreator | matcher |predicate
	effect: async (action, listenerApi) => {
		const { userData, nonImoexCompany, cart, data } = listenerApi.getState()
		const imoexDataRaw = localStorage.getItem('imoexData');
		if (imoexDataRaw !== null) {
			const imoexData = JSON.parse(imoexDataRaw);
			imoexData.imoex = data.imoex
			localStorage.setItem('imoexData', JSON.stringify(imoexData))
		}
		localStorage.setItem('userData', JSON.stringify(userData))
		localStorage.setItem('nonImoex', JSON.stringify(nonImoexCompany))
		localStorage.setItem('cart', JSON.stringify(cart))
	}
});



// при загрузке лежит старая дата а нужна новая дата, отфильтровать то что лежит и вернуть.
// в cart,nonImoex,imoexData.

// при загрузке imoexData = null, в cart, лежит imoex, отфильтровать то что лежит и вернуть