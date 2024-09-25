import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Record<string, string> = {}
export const coefficientSlice = createSlice({
	name: 'coefficientSlice',
	initialState,
	reducers: {
		addCoefficient: (state, action: PayloadAction<{ ticker: string, count: string }>) => {
			state[action.payload.ticker] = action.payload.count
		}
	}
})

export const { addCoefficient } = coefficientSlice.actions