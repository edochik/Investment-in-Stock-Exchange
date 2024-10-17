import { useEffect, useState } from "react";
import s from "./Autocomplete.module.scss";
interface AutocompleteProps<T> {
  list: T[];
  filterByKey: (arg: T, query: string) => boolean;
  render: (arg: T) => string;
  value: T | null;
  setValue: (arg: T) => void;
}

const Autocomplete = <T,>(props: AutocompleteProps<T>) => {
  const { list, filterByKey, render, value, setValue } = props;
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    if (value === null) {
      setValueInput("");
    }
  }, [value]);

  return (
    <div className={s.Autocomplete}>
      <input
        className={s.input}
        type="text"
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
      />
      <ul className={s.list}>
        {valueInput.length !== 0 &&
          list
            .filter((security) => filterByKey(security, valueInput))
            .map((item, index) => {
              return (
                <li
                  key={index}
                  className={s.company}
                  onClick={(e) => {
                    setValueInput(e.currentTarget.innerHTML);
                    setValue(item);
                  }}
                >
                  {render(item)}
                </li>
              );
            })}
        {/* filterByKey сделать в компоненте а потом выводить информацию */}
        {/* {list.length === 0 && <li>Нет данных</li>} */}
      </ul>
    </div>
  );
};

export { Autocomplete };
