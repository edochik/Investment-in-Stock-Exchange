import s from "./StockNumberInput.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateStocks } from "../../redux/userDataSlice/userDataSlice";
interface StockNumberInputProps {
  ticker: string;
}

const StockNumberInput = ({ ticker }: StockNumberInputProps) => {
  const stocks = useAppSelector((state) => state.userData.stocks);
  const dispatch = useAppDispatch();
  const handleChangeUpdateStocks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^[0-9.]*$/.test(value)) {
      return;
    }
    const valueIsNumber = Number(value);
    if (!Number.isNaN(valueIsNumber)) {
      dispatch(updateStocks({ ticker, count: valueIsNumber }));
    }
  };
  return (
    <>
      <input
        className={s.input}
        type="text"
        value={stocks[ticker] || "0"}
        onChange={handleChangeUpdateStocks}
      />
    </>
  );
};

export { StockNumberInput };
