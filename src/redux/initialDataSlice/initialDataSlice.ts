import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Security } from "../../domain/Security";
import { ImoexSecurity } from "../../domain/ImoexSecurity";
import { fetchInitialDataThunk } from "./thunk";

export interface InitialData {
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
	imoex: ImoexSecurity[],
	securities: Record<Security["secid"], Security>;
}

// const extractImoexDataLocalStorage = (): Pick<InitialData, "imoex" | 'securities'> => {
// 	const imoexCompany = localStorage.getItem('imoexData')
// 	if (imoexCompany === null) {
// 		return { imoex: [], securities: {} }
// 	}
// 	try {
// 		const { imoex, securities } = JSON.parse(imoexCompany);
// 		const result = Object.fromEntries(securities.map((s: Security) => [s.secid, s]))
// 		return { imoex, securities: result }
// 	} catch (error) {
// 		return { imoex: [], securities: {} }
// 	}
// }

// const { imoex, securities } = extractImoexDataLocalStorage();

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
		imoexExcludingCartItem: (state, action) => {
			state.imoex = action.payload;
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
				console.log(imoex.map(company => {
					const { ticker, shortnames, weight } = company;
					return {
						ticker,
						shortname: shortnames,
						weight
					}
				}));
				state.imoex = imoex;
				state.securities = Object.fromEntries(securities.map(s => [s.secid, s]))
			})
			.addCase(fetchInitialDataThunk.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error.message!;
			});
	},
});

export const { imoexExcludingCartItem } = initialDataSlice.actions