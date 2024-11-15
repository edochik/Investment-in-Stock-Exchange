import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../index";
import { updateCoefficient, updateStocks, updateUserMoney } from "../userDataSlice/userDataSlice";
import { selectedNonImoex } from "../nonImoexSlice/nonImoexSlice";
import { addCompanyToCart, removeCompanyFromCart } from "../cartSlice/cartSlice";

export function createUserDataListenerMiddleware() {
	const listenerMiddleware = createListenerMiddleware()
	const startAppListening = listenerMiddleware.startListening.withTypes<
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
		effect: async (action, listenerApi) => {
			const { userData, nonImoex, cart } = listenerApi.getState()
			localStorage.setItem('userData', JSON.stringify(userData))
			localStorage.setItem('nonImoex', JSON.stringify(nonImoex))
			localStorage.setItem('cart', JSON.stringify(cart))
		}
	})

	return listenerMiddleware;
}

export const listenerMiddleware = createUserDataListenerMiddleware();

