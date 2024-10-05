import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImoex } from "../../api/fetchImoex";
import { fetchSecurities } from "../../api/fetchSecurities";

// какой сценарий должен быть
// 1. moexDataJson может быть null в каком случае? если данных нет Localstorage;
// - если нет данных запрос к серверну и загрузка данных
// 2. moexDataJson не null, тогда второй сценарий данные есть актуальны ли они
// 2.1. данные актульны, ни чего не делаем
// 2.2  данные не актульны, делаем запрос загружаем данные
// 2.3  данные не актульны, делаем запрос получаем ошибку, в catch ловим отдаем то что есть в Localstorage

// какие проверки 


export const fetchInitialDataThunk = createAsyncThunk("fetchInitialData", async () => {
	try {
		const today = new Date();
		const todayKey = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`;
		const moexDataJson = localStorage.getItem("moexData");
		if (moexDataJson === null) {
			const [imoex, securities] = await Promise.all([fetchImoex(), fetchSecurities()])
			localStorage.setItem("moexData", JSON.stringify({ todayKey, imoex, securities }))
			return { imoex, securities }
		} else {
			const getDateKey = JSON.parse(moexDataJson).todayKey;
			if (todayKey !== getDateKey) {
				const [imoex, securities] = await Promise.all([fetchImoex(), fetchSecurities()])
				localStorage.setItem("moexData", JSON.stringify({ todayKey, imoex, securities }))
				return { imoex, securities }
			}
		}
		const { imoex, securities } = JSON.parse(localStorage.getItem('moexData'))
		return { imoex, securities }
	} catch (error) {
		const { imoex, securities } = JSON.parse(localStorage.getItem('moexData'))
		return { imoex, securities }
	}
})
