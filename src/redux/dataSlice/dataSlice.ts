import { createSlice } from "@reduxjs/toolkit";
import { Security } from "../../domain/Security";
import { ImoexSecurity } from "../../domain/ImoexSecurity";
import { fetchInitialDataThunk } from "./thunk";

export interface Data {
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
	imoex: ImoexSecurity[];
	securities: Record<Security["secid"], Security>;
}

const initialState: Data = {
	loading: "idle",
	imoex: [],
	securities: {},
	error: null,
};

export const dataSlice = createSlice({
	name: "moex",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInitialDataThunk.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(fetchInitialDataThunk.fulfilled, (state, action) => {
				state.loading = "succeeded";
				const { imoex, securities } = action.payload
				state.imoex = imoex;
				state.securities = Object.fromEntries(securities.map(s => [s.secid, s]));
			})
			.addCase(fetchInitialDataThunk.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error.message!;
			});
	},
});

