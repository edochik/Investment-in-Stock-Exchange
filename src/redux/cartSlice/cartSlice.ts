import { createSlice } from "@reduxjs/toolkit"
import { ImoexSecurity } from "../../domain/ImoexSecurity"

const initialState: ImoexSecurity[] = []

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCompanyCart: (state, action) => {
			state.push(action.payload)
		},
		removeCompanyCart: (state, action) => {
			console.log(action);
			return state.filter(item => item.secids !== action.payload)
		}
	}
})

export const { addCompanyCart, removeCompanyCart } = cartSlice.actions

