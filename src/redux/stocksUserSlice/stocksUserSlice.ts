import { createSlice } from "@reduxjs/toolkit";

type InitialState = Record<string, number>
const initialState: InitialState = {}

export const stocksUserSlice = createSlice({
	name: 'stocksUser',
	initialState,
	reducers: {
		addStocks: (state, action) => {
			Object.assign(state, action.payload)
		}
	},
})

export const { addStocks } = stocksUserSlice.actions