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
    if (
      /^[0-9]*[.]?[0-9]*$/.test(e.target.value) &&
      !e.target.value.startsWith(".")
    ) {
      const newValue = e.target.value;
      setInput(newValue);
      dispatch(updateStocks({ ticker, count: Number(newValue) }));
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
