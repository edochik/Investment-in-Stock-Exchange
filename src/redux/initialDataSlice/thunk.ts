import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImoex } from "../../api/fetchImoex";
import { fetchSecurities } from "../../api/fetchSecurities";
import { Security } from "../../domain/Security";
import { ClientSecurity } from "../../domain/ClientSecurity";

interface ImoexDataLocalStorage {
  updatedAt: Date;
  imoex: ClientSecurity[];
  securities: Security[];
}

const extractImoexDataLocalStorage = (): ImoexDataLocalStorage | null => {
  const imoexDataJson = localStorage.getItem("imoexData");
  if (imoexDataJson === null) {
    return null;
  }
  try {
    return JSON.parse(imoexDataJson);
  } catch (error) {
    return null;
  }
};

// todo
function isSameDay(d1: Date, d2: Date) {
  return true;
}

export const fetchInitialDataThunk = createAsyncThunk(
  "fetchInitialData",
  async (): Promise<ImoexDataLocalStorage & { isFresh: boolean } | null> => {
    const imoexDataLocalStorage = extractImoexDataLocalStorage();
    const today = new Date();

    if (
      imoexDataLocalStorage !== null &&
      isSameDay(today, imoexDataLocalStorage.updatedAt)
    ) {
      return { ...imoexDataLocalStorage, isFresh: true };
    }

    try {
      const [imoex, securities] = await Promise.all([
        fetchImoex(),
        fetchSecurities(),
      ]);
      const actualData = { updatedAt: today, imoex, securities };
      localStorage.setItem("imoexData", JSON.stringify(actualData));
      return { ...actualData, isFresh: true };
    } catch (error) {
      if (imoexDataLocalStorage === null) {
        return null;
      }
      return { ...imoexDataLocalStorage, isFresh: false };
    }
  }
);
