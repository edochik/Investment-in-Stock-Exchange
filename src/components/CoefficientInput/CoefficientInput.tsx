import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { updateCoefficents } from "../../redux/userDataSlice/userDataSlice";
interface CoefficientInputProps {
  ticker: string;
}
const style = {
  backgroundColor: "inherit",
  border: "none",
  outline: "none",
  textAlign: "center",
  width: "100%",
};
const CoefficientInput = ({ ticker }: CoefficientInputProps) => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();

  const handleChangeUpdateCoefficients = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (!/^[0-9.]*$/.test(value)) {
      return;
    }
    setInput(value);
    const valueAsNumber = Number(value);
    if (!Number.isNaN(valueAsNumber)) {
      dispatch(updateCoefficents({ ticker, count: valueAsNumber }));
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
        onChange={(e) => handleChangeUpdateCoefficients(e)}
      />
    </>
  );
};

export { CoefficientInput };
