import { useAppDispatch, useAppSelector } from "../../hooks";
import { addStock } from "../../redux/sumStocksSlice/sumStocksSlice";
interface StockNumberInputProps {
  ticker: string;
}
const StockNumberInput = ({ ticker }: StockNumberInputProps) => {
  const dispatch = useAppDispatch();
  const sumStocks = useAppSelector((state) => state.sumStocks);
  const handleChangeAddStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addStock({ ticker, count: Number(e.target.value) }));
  };

  return (
    <>
      <input
        type="text"
        value={sumStocks[ticker] ? sumStocks[ticker] : "0"}
        onChange={(e) => handleChangeAddStock(e)}
      />
    </>
  );
};

export { StockNumberInput };
