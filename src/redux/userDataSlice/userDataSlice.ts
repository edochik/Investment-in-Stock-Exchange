import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
	coefficients: Record<string, number>,
	stocks: Record<string, number>,
	moneyUser: number
}

const userData = {
	coefficients: {},
	stocks: {},
	moneyUser: 0,
}

const dataLocalstorage = JSON.parse(localStorage.getItem('data')) || { userData }

const initialState: UserData = dataLocalstorage.userData

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

