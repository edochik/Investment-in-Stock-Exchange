import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../redux/index";
import { getInvestmentValues } from "./getInvestmentValues";

const selectUserData = (state: RootState) => state.userData;
const selectSecuritiesData = (state: RootState) => state.data;
const selectNonImoex = (state: RootState) => state.nonImoexCompany;
const selectCart = (state: RootState) => state.cart;

export const selectInvestmentValues = createSelector(
  [selectUserData, selectSecuritiesData, selectNonImoex, selectCart],
  (userData, securitiesData, nonImoex, cart) => {
    const { imoex, securities } = securitiesData;
    console.log(imoex);
    console.log(nonImoex);
    // правильно ли это?????
    // if (Object.values(rest.securities).length === 0) {
    //   return null;
    // }
    const moex = imoex.concat(nonImoex);
    return getInvestmentValues(userData, { moex, securities }, cart);
  }
);
