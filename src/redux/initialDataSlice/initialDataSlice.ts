import { createSlice } from "@reduxjs/toolkit";
import { Security } from "../../domain/Security";
import { ImoexSecurity } from "../../domain/ImoexSecurity";
import { fetchInitialDataThunk } from "./thunk";

export interface InitialData {
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
	imoex: ImoexSecurity[],
	securities: Record<Security["secid"], Security>;
}

export const initialState: InitialData = {
	loading: "idle",
	imoex: [],
	securities: {},
	error: null,
};

export const initialDataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		removedImoex: (state, action) => {
			const { type, ticker } = action.payload;
			if (type === "IMOEX") {
				state.imoex = state.imoex.filter(company => company.ticker !== ticker)
			}
		},
		addImoex: (state, action) => {
			if (action.payload.indexid === "IMOEX") {
				state.imoex.push(action.payload)
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInitialDataThunk.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(fetchInitialDataThunk.fulfilled, (state, action) => {
				state.loading = "succeeded";
				const { imoex, securities } = action.payload;
				state.imoex = imoex;
				state.securities = Object.fromEntries(securities.map(s => [s.secid, s]))
			})
			.addCase(fetchInitialDataThunk.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error.message!;
			});
	},
});

export const { removedImoex, addImoex } = initialDataSlice.actions