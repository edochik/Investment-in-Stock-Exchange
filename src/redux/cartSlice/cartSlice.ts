import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { extractLocalStorageOnKey } from "../extractLocalStorageOnKey";

const initialState: string[] = extractLocalStorageOnKey<string[]>('cart', [])

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
	}
})

export const { addCompanyToCart, removeCompanyFromCart } = cartSlice.actions

export default cartSlice.reducer