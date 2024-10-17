import s from "./CoefficientInput.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateCoefficient } from "../../redux/userDataSlice/userDataSlice";
interface CoefficientInputProps {
  ticker: string;
}

const CoefficientInput = ({ ticker }: CoefficientInputProps) => {
  const coefficient = useAppSelector((state) => state.userData.coefficients);
  const dispatch = useAppDispatch();
  const handleChangeUpdateCoefficients = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (!/^[0-9.]*$/.test(value)) {
      return;
    }
    const valueAsNumber = Number(value);
    if (!Number.isNaN(valueAsNumber)) {
      dispatch(updateCoefficient({ ticker, count: valueAsNumber }));
    }
  };

  return (
    <>
      <input
        className={s.input}
        type="text"
        value={coefficient[ticker] || "1"}
        onChange={(e) => handleChangeUpdateCoefficients(e)}
      />
    </>
  );
};

export { CoefficientInput };
