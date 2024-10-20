import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Security } from "../../domain/Security";
import { fetchInitialDataThunk } from "./thunk";
import { ClientSecurity } from "../../domain/ClientSecurity.js";

export interface InitialData {
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
	imoex: ClientSecurity[],
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


// преобразовать могу данные в fetch => получаю данные в нужном формате
// преобразовать данные в thunk потому что здесь кладу данные в localStorage
// тогда придется преобразовывать и в Slicer 