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

const initialState: InitialData = {
	loading: "idle",
	imoex: [],
	securities: {},
	error: null,
};

export const initialDataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		addCompany: (state, action) => {
			console.log(action.payload);
			state.imoex.push(action.payload);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInitialDataThunk.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(fetchInitialDataThunk.fulfilled, (state, action) => {
				state.loading = "succeeded";
				const { imoex, securities } = action.payload
				state.imoex = imoex;
				console.log(imoex, securities);
				state.securities = Object.fromEntries(securities.map(s => [s.secid, s]));
			})
			.addCase(fetchInitialDataThunk.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error.message!;
			});
	},
});

export const { addCompany } = initialDataSlice.actions