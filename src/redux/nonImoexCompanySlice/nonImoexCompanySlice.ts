import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ClientSecurity } from "../../domain/ClientSecurity.js";

const extractNonImoexLocalStorage = (): ClientSecurity[] => {
	const nonImoexCompany = localStorage.getItem('nonImoex');
	// console.log('extractLocalStorage');
	if (nonImoexCompany === null) {
		return []
	}
	try {
		return JSON.parse(nonImoexCompany)
	} catch (error) {
		return []
	}
}

const initialState: ClientSecurity[] = extractNonImoexLocalStorage()

export const nonImoexSlice = createSlice({
	name: 'nonImoex',
	initialState,
	reducers: {
		selectedNonImoex: (state, action: PayloadAction<ClientSecurity>) => {
			state.push(action.payload);
		},
	}
})

export const { selectedNonImoex } = nonImoexSlice.actions