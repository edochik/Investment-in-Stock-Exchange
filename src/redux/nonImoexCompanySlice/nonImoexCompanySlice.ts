import { createSlice, PayloadAction } from "@reduxjs/toolkit"
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
		selectedNonImoex: (state, action: PayloadAction<ImoexSecurity>) => {
			state.push(action.payload);
		},
		addNonImoex: (state, action) => {
			if (action.payload.indexid === "NONIMOEX") {
				state.push(action.payload)
			}
		},
		removeNonImex: (state, action: PayloadAction<string>) => {
			return state.filter(company => company.ticker !== action.payload)
		}
	}
})

export const { selectedNonImoex, removeNonImex, addNonImoex } = nonImoexCompanySlice.actions