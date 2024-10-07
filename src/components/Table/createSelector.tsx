import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../redux/index";
import { getInvestmentValues } from "./getInvestmentValues";

//вытаскиваем селекторы но без useSelect т.е функции вытаскивающие данные из redux
const selectUserData = (state: RootState) => state.userData;
const selectSecuritiesData = (state: RootState) => state.data;
const selectedCompany = (state: RootState) => state.nonImoexCompany;

export const selectInvestmentValues = createSelector(
  [selectUserData, selectSecuritiesData, selectedCompany],
  // кладем сюда, отсюда уже будут доставаться selector
  (userData, securitiesData, selectedCompany) => {
    const { imoex, ...rest } = securitiesData;
    const result = imoex.concat(selectedCompany);
    return getInvestmentValues(userData, { imoex: result, ...rest });
  } // в callback передаем параметры и делаем вычисления
);
