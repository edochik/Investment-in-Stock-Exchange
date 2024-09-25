import { createSlice } from "@reduxjs/toolkit";
import { fetchInitialDataThunk } from "../dataSlice/thunk";

interface InitialState {
	ticker: string;
	shortnames: string;
	weight: number;
	price: number;
}

const initialState: InitialState[] = []

export const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchInitialDataThunk.fulfilled, (state, action) => {
			const { imoex, securities } = action.payload
			const transform = Object.fromEntries(securities.map(s => [s.secid, s]))
			return imoex.map((company) => {
				const { ticker, shortnames, weight } = company;
				const price = transform[ticker].prevprice;
				return { ticker, shortnames, weight, price };
			})
		})
	}
})