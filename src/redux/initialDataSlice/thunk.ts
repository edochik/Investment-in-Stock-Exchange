import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImoex } from "../../api/fetchImoex";
import { fetchSecurities } from "../../api/fetchSecurities";
import { ImoexSecurity } from "../../domain/ImoexSecurity.js";
import { Security } from "../../domain/Security.js";


//1. Вариант null (нет интернета, есть интернет)
// - есть интернет делаем запрос возвращаем данные []
// - нет интернета делаем запрос получаем ошибку ? возвращаем  пустоту []
//2. Вариант не null, дата просрочена  
// - есть интернет делаем запрос возвращаем данные []
// - нет интернета возвращаем то что есть []
//3. Вариант даты обновлены
// - возвращаем данные


async function extractImoexDataLocalStorage(todayKey: string): Promise<{
	imoex: ImoexSecurity[];
	securities: Record<string, Security>;
}> {
	try {
		const [imoex, securities] = await Promise.all([fetchImoex(), fetchSecurities()])
		localStorage.setItem("imoexData", JSON.stringify({ todayKey, imoex, securities }))
		return { imoex, securities }
	} catch (error) {
		
		const { imoex, securities } = JSON.parse(localStorage.getItem('imoexData'))
		return { imoex, securities }
	}
}

export const fetchInitialDataThunk = createAsyncThunk("fetchInitialData", async () => {
	const today = new Date();
	const todayKey = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`;
	const imoexDataJson = localStorage.getItem("imoexData");
	if (imoexDataJson === null) {
		return extractImoexDataLocalStorage(todayKey)
	}
	const getDateKey = JSON.parse(imoexDataJson).todayKey
	if (todayKey !== getDateKey) {
		return extractImoexDataLocalStorage(todayKey)
	}
	const { imoex, securities } = JSON.parse(localStorage.getItem('imoexData'))
	return { imoex, securities }
})
