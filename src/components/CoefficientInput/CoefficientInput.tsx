import s from "./CoefficientInput.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateCoefficient } from "../../redux/userDataSlice/userDataSlice";
interface CoefficientInputProps {
  ticker: string;
}

const CoefficientInput = ({ ticker }: CoefficientInputProps) => {
  const coefficient = useAppSelector((state) => state.userData.coefficients);
  const value = coefficient[ticker] ?? "1";
  const [inputValue, setInputValue] = useState(String(value));
  const dispatch = useAppDispatch();

  const handleUpdateCoefficients = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (!/^[0-9.]*$/.test(value)) {
      return;
    }
    setInputValue(value);
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
        value={inputValue}
        onChange={handleUpdateCoefficients}
      />
    </>
  );
};

export { CoefficientInput };
