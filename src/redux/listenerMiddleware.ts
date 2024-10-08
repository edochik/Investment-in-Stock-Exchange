import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./index";
import { updateCoefficents, updateStocks, updateUserMoney } from "./userDataSlice/userDataSlice";
import { selectedNonImoex } from "./nonImoexCompanySlice/nonImoexCompanySlice";
import { fetchInitialDataThunk } from "./initialDataSlice/thunk";

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
	RootState,
	AppDispatch
>()

startAppListening({
	matcher: isAnyOf(
		updateCoefficents,
		updateStocks,
		updateUserMoney,
		selectedNonImoex,
		fetchInitialDataThunk.fulfilled
	),
	// одно из четырех полей  type | actionCreator | matcher |predicate
	effect: async (action, listenerApi) => {
		const { userData, nonImoexCompany } = listenerApi.getState()
		localStorage.setItem('userData', JSON.stringify(userData))
		localStorage.setItem('nonImoex', JSON.stringify(nonImoexCompany))
	}
});