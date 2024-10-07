import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const extractDataUserLocalStorage = () => {
	const dataUserJson = localStorage.getItem('userData')
	if (dataUserJson === null) {
		return initialUserData
	}
	try {
		return JSON.parse(dataUserJson) as unknown as UserData;
	} catch (error) {
		return initialUserData
	}
}

const initialState: UserData = extractDataUserLocalStorage()

export const userDataSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		updateCoefficents: (state, action: PayloadAction<{ ticker: string, count: number }>) => {
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

export const { updateCoefficents, updateStocks, updateUserMoney } = userDataSlice.actions

