import { createSlice } from "@reduxjs/toolkit"
import { ImoexSecurity } from "../../domain/ImoexSecurity"

const extractCartDataLocalStorage = (): ImoexSecurity[] => {
	const cart = localStorage.getItem('cart');
	if (cart === null) {
		return []
	}
	try {
		return JSON.parse(cart)
	} catch (error) {
		return []
	}
}

const initialState: ImoexSecurity[] = extractCartDataLocalStorage()

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCompanyToCart: (state, action) => {
			state.push(action.payload)
		},
		removeCompanyFromCart: (state, action) => {
			return state.filter(item => item.secids !== action.payload)
		},
		updateItemCart: (state, action) => {
			// console.log(action);
			return action.payload
		}
	}
})

export const { addCompanyToCart, removeCompanyFromCart, updateItemCart } = cartSlice.actions

