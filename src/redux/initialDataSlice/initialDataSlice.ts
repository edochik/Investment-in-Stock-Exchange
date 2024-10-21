import { createSlice } from "@reduxjs/toolkit";
import { Security } from "../../domain/Security";
import { fetchInitialDataThunk } from "./thunk";
import { ClientSecurity } from "../../domain/ClientSecurity.js";

export interface InitialData {
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
	imoex: ClientSecurity[],
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
	reducers: {},
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
