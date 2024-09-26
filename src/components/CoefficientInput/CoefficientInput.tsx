import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeCoefficient } from "../../redux/coefficientSlice/coefficientSlice";
interface CoefficientInputProps {
  ticker: string;
}

const CoefficientInput = ({ ticker }: CoefficientInputProps) => {
  const dispatch = useAppDispatch();
  const coefficient = useAppSelector((state) => state.weights.weightCompanies);
  const handleChangeAddCoefficient = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    dispatch(changeCoefficient({ ticker, count: e.target.value }));
  };
  return (
    <>
      <input
        type="text"
        value={
          coefficient[ticker].weightOld === coefficient[ticker].weightNew
            ? "1"
            : coefficient[ticker].count
        }
        onChange={(e) => handleChangeAddCoefficient(e)}
      />
    </>
  );
};

export { CoefficientInput };
