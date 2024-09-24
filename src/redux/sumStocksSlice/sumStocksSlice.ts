import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Record<string, number> = {}
export const sumStocksSlice = createSlice({
	name: 'sumStocks',
	initialState,
	reducers: {
		addStock: (state, action: PayloadAction<{ ticker: string, count: number }>) => {
			state[action.payload.ticker] = action.payload.count
		}
	}
})

export const { addStock } = sumStocksSlice.actions 