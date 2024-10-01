import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../redux/index";
import { getInvestmentValues } from "./getInvestmentValues";

//вытаскиваем селекторы но без useSelect т.е функции вытаскивающие данные из redux
const selectUserData = (state: RootState) => state.userData;
const selectSecuritiesData = (state: RootState) => state.data;

export const selectInvestmentValues = createSelector(
  [selectUserData, selectSecuritiesData], // кладем сюда, отсюда уже будут доставаться selector
  (userDat, securitiesData) => getInvestmentValues(userDat, securitiesData) // в callback передаем параметры и делаем вычисления
);
