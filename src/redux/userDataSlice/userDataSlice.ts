import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { extractLocalStorageOnKey } from "../extractLocalStorageOnKey";

export interface UserData {
	coefficients: Record<string, number>,
	stocks: Record<string, number>,
	moneyUser: number
}

const initialUserData = {
	coefficients: {},
	moneyUser: 100000,
	stocks: {}
}

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

export default userDataSlice.reducer