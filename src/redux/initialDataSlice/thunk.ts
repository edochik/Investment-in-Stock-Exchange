import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImoex } from "../../api/fetchImoex";
import { fetchSecurities } from "../../api/fetchSecurities";
import { Security } from "../../domain/Security";
import { ClientSecurity } from "../../domain/ClientSecurity";

const extractImoexDataLocalStorage = async (): Promise<{
	imoex: ClientSecurity[];
	securities: Security[];
}> => {
	const today = new Date();
	const todayKey = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`;
	const imoexDataJson = localStorage.getItem("imoexData");
	try {
		if (imoexDataJson === null) {
			const [imoex, securities] = await Promise.all([fetchImoex(), fetchSecurities()])
			localStorage.setItem("imoexData", JSON.stringify({ todayKey, imoex, securities }))
			return { imoex, securities }
		}
		const getDateKey: string = JSON.parse(imoexDataJson).todayKey
		if (todayKey !== getDateKey) {
			const [imoex, securities] = await Promise.all([fetchImoex(), fetchSecurities()])
			localStorage.setItem("imoexData", JSON.stringify({ todayKey, imoex, securities }))
			return { imoex, securities }
		}
		const { imoex, securities } = JSON.parse(imoexDataJson);
		return { imoex, securities }
	} catch (error) {
		const getDateKey: string = JSON.parse(imoexDataJson!).todayKey;
		if (todayKey !== getDateKey) {
			const { imoex, securities } = JSON.parse(localStorage.getItem('imoexData')!)
			return { imoex, securities };
		}
		return { imoex: [], securities: [] }
	}
}

export const fetchInitialDataThunk = createAsyncThunk("fetchInitialData", async (): Promise<{
	imoex: ClientSecurity[];
	securities: Security[];
}> => {
	return extractImoexDataLocalStorage()
})