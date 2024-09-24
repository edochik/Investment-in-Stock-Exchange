import { useAppDispatch } from "../../hooks.js";
import { addStock } from "../../redux/sumStocksSlice/sumStocksSlice.js";

// import s from "./StockNumberInput.module.scss";
interface StockNumberInputProps {
  ticker: string;
}
const StockNumberInput = ({ ticker }: StockNumberInputProps) => {
  const dispatch = useAppDispatch();
	
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.target.value);
    dispatch(addStock({ ticker, count }));
  };

  return (
    <>
      <input type="text" value="0" onChange={handleChange} />
    </>
  );
};

export { StockNumberInput };
