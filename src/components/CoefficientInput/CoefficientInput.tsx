import s from "./CoefficientInput.module.scss";

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
    console.log(value);
    if (!/^[0-9.]*$/.test(value)) {
      console.log("tut");
      return;
    }
    const valueAsNumber = Number(value);
    console.log(valueAsNumber);
    if (!Number.isNaN(valueAsNumber)) {
      console.log(valueAsNumber);
      dispatch(updateCoefficient({ ticker, count: valueAsNumber }));
    }
  };

  return (
    <>
      <input
        className={s.input}
        type="text"
        value={coefficient[ticker] ?? "1"}
        onChange={(e) => handleChangeUpdateCoefficients(e)}
      />
    </>
  );
};

export { CoefficientInput };
