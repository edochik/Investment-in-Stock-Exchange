import { useState } from "react";
import s from "./Autocomplete.module.scss";
interface AutocompleteProps<T> {
  items: T[];
  filterByKey: (arg: T, query: string) => boolean;
  render: (arg: T) => React.ReactNode;
  inputStringValue: (arg: T) => string;
  value: T | null;
  setValue: (arg: T | null) => void;
}

const Autocomplete = <T,>(props: AutocompleteProps<T>) => {
  const { items, filterByKey, render, value, setValue, inputStringValue } =
    props;
  const [valueInput, setValueInput] = useState(
    value === null ? "" : inputStringValue(value)
  );

  return (
    <div className={s.Autocomplete}>
      <label className={s.label}>
        Введите название:
        <input
          className={s.input}
          type="text"
          value={valueInput}
          onChange={(e) => {
            setValueInput(e.target.value);
            setValue(null);
          }}
        />
      </label>
      <ul className={s.list}>
        {value === null &&
          items
            .filter((security) => filterByKey(security, valueInput))
            .map((item, index) => {
              return (
                <li
                  key={index}
                  className={s.item}
                  onClick={() => {
                    setValueInput(inputStringValue(item));
                    setValue(item);
                  }}
                >
                  {render(item)}
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export { Autocomplete };
