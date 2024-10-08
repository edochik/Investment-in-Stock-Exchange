import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImoex } from "../../api/fetchImoex";
import { fetchSecurities } from "../../api/fetchSecurities";
import { ImoexSecurity } from "../../domain/ImoexSecurity";
import { Security } from "../../domain/Security";


async function extractImoexDataLocalStorage(todayKey: string): Promise<{
	imoex: ImoexSecurity[];
	securities: Security[];
}> {
	try {
		const [imoex, securities] = await Promise.all([fetchImoex(), fetchSecurities()])
		localStorage.setItem("imoexData", JSON.stringify({ todayKey, imoex, securities }))
		return { imoex, securities }
	} catch (error) {
		const imoexDataJson = localStorage.getItem("imoexData")
		if (imoexDataJson === null) {
			return { imoex: [], securities: [] }
		}
		const { imoex, securities } = JSON.parse(localStorage.getItem('imoexData')!)
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
