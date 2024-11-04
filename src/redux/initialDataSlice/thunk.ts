import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImoex } from "../../api/fetchImoex";
import { fetchSecurities } from "../../api/fetchSecurities";
import { Security } from "../../domain/Security";
import { ClientSecurity } from "../../domain/ClientSecurity";
import { extractLocalStorageOnKey } from "../extractLocalStorageOnKey";
import { isSameDay } from "./isSameDay";
interface ImoexDataLocalStorage {
  updatedAt: Date;
  imoex: ClientSecurity[];
  securities: Security[];
}

export const fetchInitialDataThunk = createAsyncThunk(
  "fetchInitialData",
  async (): Promise<ImoexDataLocalStorage & { isFresh: boolean } | null> => {
    const imoexDataLocalStorage = extractLocalStorageOnKey<ImoexDataLocalStorage | null>("imoexData", null);
    const toDay = new Date();
    if (
      imoexDataLocalStorage !== null &&
      !isSameDay(toDay, imoexDataLocalStorage.updatedAt)
    ) {
      return { ...imoexDataLocalStorage, isFresh: true };
    }
    try {
      const [imoex, securities] = await Promise.all([
        fetchImoex(),
        fetchSecurities(),
      ]);
      const actualData = { updatedAt: toDay, imoex, securities };
      localStorage.setItem("imoexData", JSON.stringify(actualData));
      return { ...actualData, isFresh: true };
    } catch (error) {
      if (imoexDataLocalStorage === null) {
        return null;
      }
      console.log('>>>>>>>>>>>>>>>> tut <<<<<<<<<<');
      return { ...imoexDataLocalStorage, isFresh: false };
    }
  }
);
