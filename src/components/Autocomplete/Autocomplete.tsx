import { useEffect, useRef, useState } from "react";
import { Security } from "../../domain/Security";
import { useAppSelector } from "../../hooks";
import s from "./Autocomplete.module.scss";

interface AutocompleteProps<T> {
  list: T[];
  filterByKey: (securities: Security, value: string) => boolean;
  setTicker: (ticker: string) => void;
  cleanInput: boolean;
  setCleanInput: (arg: boolean) => void;
}

const Autocomplete = (props: AutocompleteProps<Security>) => {
  const { list, filterByKey, setTicker, cleanInput, setCleanInput } = props;
  const [selectedInput, setSelectedInput] = useState("");
  const { securities } = useAppSelector((state) => state.data);
  const refSelectedInput = useRef(null);

  const onClickSelectedItem = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    ticker: string
  ) => {
    const target = e.target as HTMLElement;
    setSelectedInput(target.innerText);
    setTicker(ticker);
  };

  useEffect(() => {
    if (cleanInput || selectedInput.length === 0) {
      setSelectedInput("");
    }
    setCleanInput(false);

    const handleChangeKeydownPress = (event: KeyboardEvent) => {
      if (
        refSelectedInput.current &&
        refSelectedInput.current === event.target
      ) {
        const button = event.key.toUpperCase();
        if (button === "BACKSPACE") {
          setTicker("");
        }
      }
    };
    document.addEventListener("keydown", handleChangeKeydownPress);
    return () => {
      document.removeEventListener("keydown", handleChangeKeydownPress);
    };
  }, [cleanInput, setCleanInput, setTicker, selectedInput]);

  return (
    <div className={s.ListSelected}>
      <input
        ref={refSelectedInput}
        className={s.input}
        type="text"
        value={selectedInput}
        onChange={(e) => setSelectedInput(e.target.value)}
      />
      {selectedInput.length > 0 && (
        <ul className={s.list}>
          {list
            .filter((company) =>
              filterByKey(securities[company.secid], selectedInput)
            )
            .map((company) => {
              const criteria = `${company.secid} ${company.shortname}`;
              if (criteria !== selectedInput) {
                return (
                  <li
                    key={company.secid}
                    className={s.company}
                    onClick={(e) => onClickSelectedItem(e, company.secid)}
                  >
                    {company.secid} {company.shortname}
                  </li>
                );
              }
              return null;
            })}
        </ul>
      )}
    </div>
  );
};

export { Autocomplete };

//! control + x => setTicker("")

// поведение
// когда в инпуте удаляешь хотябы одну букву то ticker должен быть ""
// происходит сброс , и заново надо выбрать

// перемещаться по списку с помощью клавиатуры down или up
// при перемещении строка должна быть выделена
// при фокусе на мышку, выделение строки должно быть снято и переключено на мышку
// при нажатии на enter компания должна быть выбрана
