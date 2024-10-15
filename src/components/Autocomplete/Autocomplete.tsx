import { useState } from "react";
import s from "./Autocomplete.module.scss";

interface AutocompleteProps<T> {
  list: T[];
  filterByKey: (value: T, query: string) => boolean;
  showElements: (value: T) => string;
  value: T | string;
  // setValue: (value: T) => void;
}
// если фильтрую из вне, так и выводить информацию я должен из вне
// внутри не получится сделать, item.shortname, item.secid ??? внутри не должен знать об этом снаружи
const Autocomplete = <T,>(props: AutocompleteProps<T>) => {
  const {
    list,
    filterByKey,
    showElements,
    value,
    //  setValue
  } = props;
  const [valueInput, setValueInput] = useState("");

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
            .map((item) => {
              // console.log(item);
              return (
                <li key={`${item}`} className={s.company}>
                  {showElements(item)}
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export { Autocomplete };
