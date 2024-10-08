import { createSlice } from "@reduxjs/toolkit"
import { ImoexSecurity } from "../../domain/ImoexSecurity.js"


const extractSelectedNonImoexLocalStorage = () => {
	const selectedCompanyJson = localStorage.getItem('nonImoex');
	if (selectedCompanyJson === null) {
		return []
	}
	try {
		return JSON.parse(selectedCompanyJson)
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
		removedNonImoex: (state, action) => {
			const { type, ticker } = action.payload;
			if (type === "NONIMOEX") {
				return state.filter(company => company.ticker !== ticker)
			}
		},
		addNonImoex: (state, action) => {
			if (action.payload.indexid === "NONIMOEX") {
				state.push(action.payload)
			}
		}
	}
})

export const { selectedNonImoex, removedNonImoex, addNonImoex } = nonImoexCompanySlice.actions