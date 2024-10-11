import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImoex } from "../../api/fetchImoex";
import { fetchSecurities } from "../../api/fetchSecurities";
import { ImoexSecurity } from "../../domain/ImoexSecurity";
import { Security } from "../../domain/Security";


// должны использовать когда даты разные и когда у нас null изначально
const filterImoexByCart = (imoex: ImoexSecurity[]) => {
	const rawCart = localStorage.getItem('cart');
	if (rawCart === null) {
		return imoex
	}
	try {
		const cart: ImoexSecurity[] = JSON.parse(rawCart)
		const keys = new Set(cart.map(item => item.ticker));
		return imoex.filter(item => !keys.has(item.ticker))
	} catch (error) {
		return imoex
	}
}

const extractImoexDataLocalStorage = async (todayKey: string): Promise<{
	imoex: ImoexSecurity[];
	securities: Security[];
}> => {
	try {
		const [imoex, securities] = await Promise.all([fetchImoex(), fetchSecurities()])
		const filterImoex = filterImoexByCart(imoex)
		localStorage.setItem("imoexData", JSON.stringify({ todayKey, imoex: filterImoex, securities }))
		return { imoex: filterImoex, securities }
	} catch (error) {
		const imoexDataJson = localStorage.getItem("imoexData");
		if (imoexDataJson === null) {
			return { imoex: [], securities: [] }
		}
		const { imoex, securities } = JSON.parse(imoexDataJson);
		return { imoex, securities }
	}
}

export const fetchInitialDataThunk = createAsyncThunk("fetchInitialData", async (): Promise<{
	imoex: ImoexSecurity[];
	securities: Security[];
}> => {
	const today = new Date();
	const todayKey = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`;
	const imoexDataJson = localStorage.getItem("imoexData");
	if (imoexDataJson === null) {
		return extractImoexDataLocalStorage(todayKey)
	}
	const getDateKey: string = JSON.parse(imoexDataJson).todayKey
	if (todayKey !== getDateKey) {
		return extractImoexDataLocalStorage(todayKey)
	}
	const { imoex, securities } = JSON.parse(localStorage.getItem('imoexData')!)
	return { imoex, securities }
})
