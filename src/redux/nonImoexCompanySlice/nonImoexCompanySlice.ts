import { createSlice } from "@reduxjs/toolkit"
import { ImoexSecurity } from "../../domain/ImoexSecurity.js"


const extractSelectedCompanyLocalStorage = () => {
	const selectedCompanyJson = localStorage.getItem('selectedCompany');
	if (selectedCompanyJson === null) {
		return []
	}
	try {
		return JSON.parse(selectedCompanyJson)
	} catch (error) {
		return []
	}
}

const initialState: ImoexSecurity[] = extractSelectedCompanyLocalStorage()


export const nonImoexCompanySlice = createSlice({
	name: 'selectedSecurities',
	initialState,
	reducers: {
		selectedNonImoex: (state, action) => {
			state.push(action.payload);
		},
		removedCompanyNonImoex: (state, action) => {
			return state.filter(company => company.ticker !== action.payload)
		}
	}
})

export const { selectedNonImoex, removedCompanyNonImoex } = nonImoexCompanySlice.actions