import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ImoexSecurity } from "../../domain/ImoexSecurity.js"

const extractNonImoexLocalStorage = (): ImoexSecurity[] => {
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
export interface UserSecurity {
	indexId: "IMOEX" | "NONIMOEX",
	ticker: string,
	shortname: string,
	weight: number,
}

const initialState: ImoexSecurity[] = extractNonImoexLocalStorage()

export const nonImoexCompanySlice = createSlice({
	name: 'nonImoex',
	initialState,
	reducers: {
		selectedNonImoex: (state, action: PayloadAction<ImoexSecurity>) => {
			state.push(action.payload);
		},
	}
})

export const { selectedNonImoex } = nonImoexCompanySlice.actions