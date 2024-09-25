import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCoefficient } from "../../redux/coefficientSlice/coefficientSlice";
interface CoefficientInputProps {
  ticker: string;
}

const CoefficientInput = ({ ticker }: CoefficientInputProps) => {
  const dispatch = useAppDispatch();
  const coefficient = useAppSelector((state) => state.coefficient);
  const handleChangeAddCoefficient = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(addCoefficient({ ticker, count: e.target.value }));
  };
  return (
    <>
      <input
        type="text"
        value={coefficient[ticker] !== undefined ? coefficient[ticker] : "1"}
        onChange={(e) => handleChangeAddCoefficient(e)}
      />
    </>
  );
};

export { CoefficientInput };
