import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCoefficents } from "../../redux/userDataSlice/userDataSlice";
interface CoefficientInputProps {
  ticker: string;
}

const CoefficientInput = ({ ticker }: CoefficientInputProps) => {
  const dispatch = useAppDispatch();
  const coefficients = useAppSelector((state) => state.userData.coefficients);
  const handleChangeAddCoefficient = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(addCoefficents({ ticker, count: e.target.value }));
  };
  return (
    <>
      <input
        type="text"
        value={coefficients[ticker] !== undefined ? coefficients[ticker] : "1"}
        onChange={(e) => handleChangeAddCoefficient(e)}
      />
    </>
  );
};

export { CoefficientInput };
