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



export const selectedCompanySlice = createSlice({
	name: 'selectedSecurities',
	initialState,
	reducers: {
		addCompany: (state, action) => {
			state.push(action.payload);
		}
	}
})

export const { addCompany } = selectedCompanySlice.actions