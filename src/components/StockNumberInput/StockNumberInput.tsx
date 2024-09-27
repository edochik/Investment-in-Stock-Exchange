import { useAppDispatch, useAppSelector } from "../../hooks";
import { addStocks } from "../../redux/userDataSlice/userDataSlice";
interface StockNumberInputProps {
  ticker: string;
}
const StockNumberInput = ({ ticker }: StockNumberInputProps) => {
  const dispatch = useAppDispatch();
  const sumStocks = useAppSelector((state) => state.userData.stocks);
  const handleChangeAddStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addStocks({ ticker, count: Number(e.target.value) }));
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
