import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_IMOEX } from '../../services/Api';
import { getImoexApi } from '../../services/getImoexApi';

export interface Imoex {
	indexid: string,
	tradedate: string,
	ticker: string,
	shortnames: string,
	secids: string,
	weight: number,
	tradingsession: number,
}

interface InitialState {
	loading: 'idle' | 'pending' | 'succeeded' | 'failed',
	data: Imoex[],
	error: string | null,
}

export const fetchDataImoex = createAsyncThunk(
	'data/fetchDataImoex',
	async () => {
		const data = await getImoexApi<Imoex>(API_IMOEX)
		return data;
	}
)

const initialState: InitialState = {
	loading: 'idle',
	data: [],
	error: null,
}

export const imoexSlicer = createSlice({
	name: 'imoex',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDataImoex.pending, (state) => {
				state.loading = 'pending';
				state.data = [];
			})
			.addCase(fetchDataImoex.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchDataImoex.rejected, (state, action) => {
				state.loading = 'failed';
				state.error = action.error.message! //*есть сомнения
			})
	}
})

export default imoexSlicer.reducer;