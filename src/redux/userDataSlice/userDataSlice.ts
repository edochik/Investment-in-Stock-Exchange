import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userData {
	coefficients: Record<string, string>,
	stocks: Record<string, number>,
	UserMoneyInput: number
}

const initialState: userData = {
	coefficients: {},
	stocks: {},
	UserMoneyInput: 0,
}

export const userDataSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		addCoefficents: (state, action: PayloadAction<{ ticker: string, count: string }>) => {
			state.coefficients[action.payload.ticker] = action.payload.count;
		},
		addStocks: (state, action: PayloadAction<{ ticker: string, count: number }>) => {
			state.stocks[action.payload.ticker] = action.payload.count;
		},
		addUserMoneyInput: (state, action: PayloadAction<number>) => {
			state.UserMoneyInput = action.payload;
		}
	},
})


export const { addCoefficents, addStocks, addUserMoneyInput } = userDataSlice.actions

