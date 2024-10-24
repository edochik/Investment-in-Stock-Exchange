import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImoex } from "../../api/fetchImoex";
import { fetchSecurities } from "../../api/fetchSecurities";
import { Security } from "../../domain/Security";
import { ClientSecurity } from "../../domain/ClientSecurity";
import { extractLocalStorageOnKey } from "../extractLocalStorageOnKey";

interface ImoexDataLocalStorage {
  updatedAt: Date;
  imoex: ClientSecurity[];
  securities: Security[];
}

// const extractImoexDataLocalStorage = (): ImoexDataLocalStorage | null => {
//   const imoexDataJson = localStorage.getItem("imoexData");
//   if (imoexDataJson === null) {
//     return null;
//   }
//   try {
//     return JSON.parse(imoexDataJson);
//   } catch (error) {
//     return null;
//   }
// };


function isSameDay(toDayRaw: Date, dateString: Date) {
  const oldDay = new Date(dateString).setHours(0, 0, 0, 0);
  const toDay = new Date(toDayRaw).setHours(0, 0, 0, 0)
  return toDay > oldDay;
}

export const fetchInitialDataThunk = createAsyncThunk(
  "fetchInitialData",
  async (): Promise<ImoexDataLocalStorage & { isFresh: boolean } | null> => {
    // const imoexDataLocalStorage = extractImoexDataLocalStorage();
    const imoexDataLocalStorage = extractLocalStorageOnKey<ImoexDataLocalStorage | null>("imoexData", null);
    const toDay = new Date();
    // сюда попадаем если localStorage не пустой и дата не меньше обновленной даты
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
      return { ...imoexDataLocalStorage, isFresh: false };
    }
  }
);
