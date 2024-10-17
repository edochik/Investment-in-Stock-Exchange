import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ImoexSecurity } from "../../domain/ImoexSecurity"

const extractCartLocalStorage = () => {
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

const initialState: string[] = extractCartLocalStorage()

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCompanyToCart: (state, action: PayloadAction<string>) => {
			state.push(action.payload)
		},
		removeCompanyFromCart: (state, action: PayloadAction<string>) => {
			return state.filter(item => item !== action.payload)
		},
		// делал для обновление middleware
		updateItemCart: (state, action: PayloadAction<ImoexSecurity[]>) => {
			// return action.payload
		}
	}
})

export const { addCompanyToCart, removeCompanyFromCart, updateItemCart } = cartSlice.actions

