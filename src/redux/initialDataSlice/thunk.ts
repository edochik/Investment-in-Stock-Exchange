import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImoex } from "../../api/fetchImoex";
import { fetchSecurities } from "../../api/fetchSecurities";

// const localStorageData = JSON.parse(localStorage.getItem('localstorageData')) || {};
// const date = new Date();
// const key = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
// if (localStorageData.date !== key) {
// export const fetchInitialDataThunk = createAsyncThunk("fetchInitialData", () => {
// 	return Promise.all([fetchImoex(), fetchSecurities()])
// 		.then(([imoex, securities]) => {
// 			const date = new Date();
// 			const dateKey = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
// 			localStorage.setItem("moexData", JSON.stringify({ dateKey, imoex, securities }))
// 			return ({ imoex, securities })
// 		})
// })


export const fetchInitialDataThunk = createAsyncThunk("fetchInitialData", async () => {
	const today = new Date();
	const todayKey = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`;

	// const moexDataJson = localStorage.getItem("moexData");
	// if (moexDataJson !== null) {
	// } else {
		// const getDateKey = JSON.parse(moexDataJson).todayKey;
		// if (todayKey !== getDateKey) {
			const [imoex, securities] = await Promise.all([fetchImoex(), fetchSecurities()])
			localStorage.setItem("moexData", JSON.stringify({ todayKey, imoex, securities }))
			return { imoex, securities }
		// } 
	// }
})
