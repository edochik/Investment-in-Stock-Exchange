import { createSlice } from "@reduxjs/toolkit"
import { ImoexSecurity } from "../../domain/ImoexSecurity"

const initialState: ImoexSecurity[] = []

export const cartSlice = createSlice({
	name: 'removedCompany',
	initialState,
	reducers: {
		addCompanyCart: (state, action) => {
			state.push(action.payload)
		}
	}
})

export const { addCompanyCart } = cartSlice.actions

