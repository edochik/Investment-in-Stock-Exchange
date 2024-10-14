import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../redux/index";
import { getInvestmentValues } from "./getInvestmentValues";

//вытаскиваем селекторы но без useSelect т.е функции вытаскивающие данные из redux
const selectUserData = (state: RootState) => state.userData;
const selectSecuritiesData = (state: RootState) => state.data;
const selectNonImoex = (state: RootState) => state.nonImoexCompany;

export const selectInvestmentValues = createSelector(
  [selectUserData, selectSecuritiesData, selectNonImoex],
  (userData, securitiesData, selectedCompany) => {
    const { imoex, ...rest } = securitiesData;
    // правильно ли это?????
    if (Object.values(rest.securities).length === 0) {
      return null;
    }
    const result = imoex.concat(selectedCompany);
    return getInvestmentValues(userData, { imoex: result, ...rest });
  }
);
