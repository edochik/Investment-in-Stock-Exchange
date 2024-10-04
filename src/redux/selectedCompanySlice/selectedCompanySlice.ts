import { createSlice } from "@reduxjs/toolkit"
import { ImoexSecurity } from "../../domain/ImoexSecurity.js"

const initialState: ImoexSecurity[] = []

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