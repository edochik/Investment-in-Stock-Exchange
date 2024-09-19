import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImoex } from "../../api/fetchImoex";
import { fetchSecurities } from "../../api/fetchSecurities";

export const fetchInitialDataThunk = createAsyncThunk("fetchInitialData", () =>
	Promise.all([fetchImoex(), fetchSecurities()])
		.then(([imoex, securities]) => ({ imoex, securities }))
);