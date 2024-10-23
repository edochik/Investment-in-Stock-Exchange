import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../redux/index";
import { getInvestmentValues } from "./getInvestmentValues";

const selectUserData = (state: RootState) => state.userData;
const selectSecuritiesData = (state: RootState) => state.data.data!;
const selectNonImoex = (state: RootState) => state.nonImoex;
const selectCart = (state: RootState) => state.cart;

export const selectInvestmentValues = createSelector(
  [selectUserData, selectSecuritiesData, selectNonImoex, selectCart],
  (userData, securitiesData, nonImoex, cart) => {
    const { imoex, securities } = securitiesData;
    if (Object.values(securities).length === 0) {
      return [];
    }
    const moex = imoex.concat(nonImoex);
    return getInvestmentValues(userData, { moex, securities }, cart);
  }
);
