import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { updateStocks } from "../../redux/userDataSlice/userDataSlice";
interface StockNumberInputProps {
  ticker: string;
}
const style = {
  backgroundColor: "inherit",
  border: "none",
  outline: "none",
  textAlign: "center",
  width: "100%",
};
const StockNumberInput = ({ ticker }: StockNumberInputProps) => {
  const [input, setInput] = useState("0");
  const dispatch = useAppDispatch();
  const handleChangeUpdateStocks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^[0-9.]*$/.test(value)) {
      return;
    }
    setInput(value);
    const valueIsNumber = Number(value);
    if (!Number.isNaN(valueIsNumber)) {
      dispatch(updateStocks({ ticker, count: valueIsNumber }));
    }
  };

  return (
    <>
      <input
        style={{
          backgroundColor: "inherit",
          border: "none",
          outline: "none",
          textAlign: "center",
          width: "100%",
        }}
        type="text"
        value={input}
        onChange={(e) => handleChangeUpdateStocks(e)}
      />
    </>
  );
};

export { StockNumberInput };
