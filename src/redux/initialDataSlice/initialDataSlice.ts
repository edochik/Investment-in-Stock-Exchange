import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Security } from "../../domain/Security";
import { fetchInitialDataThunk } from "./thunk";
import { ClientSecurity } from "../../domain/ClientSecurity.js";

export interface InitialData {
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
	data: {
		imoex: ClientSecurity[],
		securities: Record<Security["secid"], Security>;
		updatedAt: Date | null,
		isFresh: boolean
	} | null;
}

export const initialState: InitialData = {
	loading: "idle",
	error: null,
	data: {
		imoex: [],
		securities: {},
		updatedAt: null,
		isFresh: false,
	}
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
				if (action.payload === null) {
					state.data = null
					return;
				}
				const { imoex, securities, updatedAt, isFresh } = action.payload;
				state.data = {
					imoex,
					updatedAt,
					isFresh,
					securities: Object.fromEntries(securities.map(s => [s.secid, s]))
				};
			})
			.addCase(fetchInitialDataThunk.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error.message!;
			});
	},
});
