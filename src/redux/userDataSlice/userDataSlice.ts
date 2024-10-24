import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { extractLocalStorageOnKey } from "../extractLocalStorageOnKey";

export interface UserData {
	coefficients: Record<string, number>,
	stocks: Record<string, number>,
	moneyUser: number
}

const initialUserData = {
	coefficients: {},
	moneyUser: 0,
	stocks: {}
}

// const extractDataUserLocalStorage = () => {
// 	const dataUserJson = localStorage.getItem('userData')
// 	if (dataUserJson === null) {
// 		return initialUserData
// 	}
// 	try {
// 		return JSON.parse(dataUserJson) as unknown as UserData;
// 	} catch (error) {
// 		return initialUserData
// 	}
// }

const initialState: UserData = extractLocalStorageOnKey<UserData>('userData', initialUserData)

export const userDataSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		updateCoefficient: (state, action: PayloadAction<{ ticker: string, count: number }>) => {
			state.coefficients[action.payload.ticker] = action.payload.count;
		},
		updateStocks: (state, action: PayloadAction<{ ticker: string, count: number }>) => {
			state.stocks[action.payload.ticker] = action.payload.count;
		},
		updateUserMoney: (state, action: PayloadAction<number>) => {
			state.moneyUser = action.payload
		}
	},
})

export const { updateCoefficient, updateStocks, updateUserMoney } = userDataSlice.actions

