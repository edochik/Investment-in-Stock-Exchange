import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInitialDataThunk } from "../dataSlice/thunk";

type Weight = Record<string, Record<string, string>>
interface InitialState {
	weightCompanies: Weight,
	totalWeight: number
}

const initialState: InitialState = {
	weightCompanies: {},
	totalWeight: 0
}

export const weightCompaniesSlice = createSlice({
	name: 'coefficientSlice',
	initialState,
	reducers: {
		changeCoefficient: (state, action: PayloadAction<{ ticker: string, count: string }>) => {
			const { ticker, count } = action.payload;
			const weightNew = Number(state.weightCompanies[ticker].weightOld) * Number(count);
			state.weightCompanies[ticker].weightNew = String(weightNew);
			state.weightCompanies[ticker].count = count;
			let total = 0;
			for (const company in state.weightCompanies) {
				total += Number(state.weightCompanies[company].weightNew)
			}
			state.totalWeight = total
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchInitialDataThunk.fulfilled, (state, action) => {
			const { imoex } = action.payload;
			imoex.forEach(company => {
				state.weightCompanies[company.ticker] = { 'weightOld': String(company.weight), 'weightNew': String(company.weight) }
			});
			state.totalWeight = imoex.reduce((acc, company) => acc + company.weight, 0)
		})
	}
})

export const { changeCoefficient } = weightCompaniesSlice.actions


// вариант
// {
// 	'adsf': {
// 		coef: '1',
// 		weight: '0.12'
// 	},
// 	'jfsp': {
// 		coef: '3',
// 		weightOld: '0.45',
// 		weightNew: '1.35'
// 	},
// }
// нужно знать старое свойство чтобы пересчитать новое
// total???
// coefficient[adfa].oldWeight === coefficient[adfa].newWeight ? '1' : coefficient[adfa].newWeight