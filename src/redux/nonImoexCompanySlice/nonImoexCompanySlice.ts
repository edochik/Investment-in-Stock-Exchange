import { createSlice } from "@reduxjs/toolkit"
import { ImoexSecurity } from "../../domain/ImoexSecurity.js"

const extractSelectedNonImoexLocalStorage = (): ImoexSecurity[] => {
	const nonImoexCompany = localStorage.getItem('nonImoex');
	if (nonImoexCompany === null) {
		return []
	}
	try {
		return JSON.parse(nonImoexCompany)
	} catch (error) {
		return []
	}
}

const initialState: ImoexSecurity[] = extractSelectedNonImoexLocalStorage()

export const nonImoexCompanySlice = createSlice({
	name: 'nonImoex',
	initialState,
	reducers: {
		selectedNonImoex: (state, action) => {
			state.push(action.payload);
		},
		addNonImoex: (state, action) => {
			if (action.payload.indexid === "NONIMOEX") {
				state.push(action.payload)
			}
		},
		removeNonImex: (state, action) => {
			const { type, ticker } = action.payload;
			if (type === "NONIMOEX") {
				return state.filter(company => company.ticker !== ticker)
			}
		}
	}
})

export const { selectedNonImoex, removeNonImex, addNonImoex } = nonImoexCompanySlice.actions