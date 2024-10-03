import s from "./StockNumberInput.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateStocks } from "../../redux/userDataSlice/userDataSlice";
interface StockNumberInputProps {
  ticker: string;
  stocks: number;
}

const StockNumberInput = ({ ticker }: StockNumberInputProps) => {
  const stocks = useAppSelector((state) => state.userData.stocks);
  const [input, setInput] = useState(stocks[ticker] || "0");
  const dispatch = useAppDispatch();
  const handleChangeUpdateStocks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^[0-9.]*$/.test(value)) {
      return;
    }
    setInput(+value);
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
        value={input}
        onChange={(e) => handleChangeUpdateStocks(e)}
      />
    </>
  );
};

export { StockNumberInput };
