import { useEffect, useState } from "react";
import s from "./Autocomplete.module.scss";

interface AutocompleteProps<T> {
  list: T[];
  filterByKey: (arg: T, query: string) => boolean;
  showElement: (arg: T) => string;
  value: T | null;
  setValue: (arg: T) => void;
}
// если фильтрую из вне, так и выводить информацию я должен из вне
// внутри не получится сделать, item.shortname, item.secid ??? внутри не должен знать об этом снаружи
const Autocomplete = <T,>(props: AutocompleteProps<T>) => {
  const { list, filterByKey, showElement, value, setValue } = props;
  const [valueInput, setValueInput] = useState("");
  
  useEffect(() => {
    if (value === null) {
      setValueInput("");
    }
  }, [value]);

  const onClickValue = (item: T) => {
    setValue(item);
    setValueInput(showElement(item));
  };

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
                  onClick={() => onClickValue(item)}
                >
                  {showElement(item)}
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
