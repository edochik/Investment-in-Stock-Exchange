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
		updateCoefficents, // коэффициент пользователя
		updateStocks, // акции пользователя 
		updateUserMoney, // деньги пользователя
		selectedNonImoex, // выбранные компании пользователя
		fetchInitialDataThunk.fulfilled // ?? добавил на изменение
	),
	// одно из четырех полей  type | actionCreator | matcher |predicate
	effect: async (action, listenerApi) => {
		// console.log(listenerApi.getState(), 'getState');
		// console.log(listenerApi.getOriginalState(), 'getOriginalState');
		// getOriginalState при первой загрузке будет pending c imoex.length = 0
		const { userData, nonImoexCompany } = listenerApi.getState()
		localStorage.setItem('userData', JSON.stringify(userData))
		localStorage.setItem('nonImoex', JSON.stringify(nonImoexCompany))
	}
});

// selectedNonImoex | removedNonImoex | addNonImoex - обновление nonImoex => добавление отслеживания в middleware
// removedImoex | addImoex - обновление данных Imoex => добавление отслеживания в middleware
// addCompanyCart | removeCompanyCart - обновление данных Cart => добавление отслеживания в middleware

// какая есть проблема
// обновление данных если это другой день? мы делаем загрузку с разу в хранилище, данные будут задваиваться
// Решение: тогда если данные есть проверять localstorage - пробегаемся по данным и обновляем их (проверяем cart, imoex, nonImoex)
// обновление данных если данных null??? такая ситуация может возникнуть первый раз или удалил данные из локал
