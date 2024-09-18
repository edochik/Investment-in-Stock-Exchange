
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_SECURITIES } from "../../services/Api";
import { getSecuritiesApi } from "../../services/getSecuritiesApi";

export interface Securities {
	secid: string,
	boardid: string,
	shortname: string,
	prevprice: number,
	lotsize: number,
	facevalue: number,
	status: string,
	boardname: string,
	decimals: number,
	secname: string,
	remarks: null,
	marketcode: string,
	instrid: string,
	sectorid: null,
	minstep: number,
	prevwaprice: number,
	faceunit: string,
	prevdate: string,
	issuesize: number,
	isin: string,
	latname: string,
	regnumber: string,
	prevlegalcloseprice: number,
	currencyid: string,
	sectype: string,
	listlevel: number,
	settledate: string
};

interface InitialState {
	loading: 'idle' | 'pending' | 'succeeded' | 'failed',
	data: Record<string, Securities>;
	error: string | null;
}

export const fetchDataSecurities = createAsyncThunk(
	'data/fetchDataSecurities',
	async () => {
		const data = await getSecuritiesApi(API_SECURITIES)
		return data;
	}
)

const initialState: InitialState = {
	loading: 'idle',
	data: {},
	error: null
}

export const securitiesSlicer = createSlice({
	name: 'securities',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDataSecurities.pending, (state) => {
				state.loading = 'pending';
				state.data = {};
			})
			.addCase(fetchDataSecurities.fulfilled, (state, action) => {
				state.loading = 'succeeded';
				state.data = action.payload;
			})
			.addCase(fetchDataSecurities.rejected, (state, action) => {
				state.loading = 'failed';
				state.error = action.error.message!;
			})
	}
})

export default securitiesSlicer.reducer