import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMoexApi } from "../../services/getMoexApi";
import { API } from "../../services/api";
import { Securities } from "./securitiesSlicer";
import { Imoex } from "./imoexSlicer";

interface Moex {
	imoex: Imoex[],
	securities: Record<string, Securities>
}

interface InitialState {
	loading: 'idle' | 'pending' | 'succeeded' | 'failed',
	moex: Moex,
	error: string | null,
}

export const fetchDataMoex = createAsyncThunk(
	'moex/fetchDataMoex',
	async () => {
		const data = await getMoexApi(API)
		return data
	}
)

const initialState: InitialState = {
	loading: 'idle',
	moex: {
		imoex: [],
		securities: {}
	},
	error: null
}

const moexSlicer = createSlice({
	name: 'moex',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDataMoex.pending, (state) => {
				state.loading = 'pending';
				state.moex.imoex = []
				state.moex.securities = {}
			})
			.addCase(fetchDataMoex.fulfilled, (state, action) => {
				state.loading = 'succeeded';
				state.moex = action.payload;
			})
			.addCase(fetchDataMoex.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error.message!
			})
	}
})

export default moexSlicer.reducer