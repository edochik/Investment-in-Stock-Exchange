import { createSlice, PayloadAction } from "@reduxjs/toolkit"
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
		addCompanyToCart: (state, action: PayloadAction<ImoexSecurity>) => {
			state.push(action.payload)
		},
		removeCompanyFromCart: (state, action: PayloadAction<string>) => {
			return state.filter(item => item.secids !== action.payload)
		},
		updateItemCart: (state, action: PayloadAction<ImoexSecurity[]>) => {
			return action.payload
		}
	}
})

export const { addCompanyToCart, removeCompanyFromCart, updateItemCart } = cartSlice.actions

