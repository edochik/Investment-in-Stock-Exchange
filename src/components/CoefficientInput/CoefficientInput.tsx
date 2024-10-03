import s from "./CoefficientInput.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateCoefficents } from "../../redux/userDataSlice/userDataSlice";
interface CoefficientInputProps {
  ticker: string;
}

const CoefficientInput = ({ ticker }: CoefficientInputProps) => {
  const coefficient = useAppSelector((state) => state.userData.coefficients);
  const [input, setInput] = useState(coefficient[ticker] || "1");
  const dispatch = useAppDispatch();

  const handleChangeUpdateCoefficients = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (!/^[0-9.]*$/.test(value)) {
      return;
    }
    setInput(value);
    const valueAsNumber = Number(value);
    if (!Number.isNaN(valueAsNumber)) {
      dispatch(updateCoefficents({ ticker, count: valueAsNumber }));
    }
  };

  return (
    <>
      <input
        className={s.input}
        type="text"
        value={input}
        onChange={(e) => handleChangeUpdateCoefficients(e)}
      />
    </>
  );
};

export { CoefficientInput };
