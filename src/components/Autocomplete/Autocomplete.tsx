import { useEffect, useRef, useState } from "react";
import { Security } from "../../domain/Security";
import { useAppSelector } from "../../hooks";
import s from "./Autocomplete.module.scss";

interface AutocompleteProps<T> {
  list: T[];
  filterByKey: (object: T, value: string) => boolean;
  setTicker: (ticker: string) => void;
  cleanInput: boolean;
  setCleanInput: (arg: boolean) => void;
}

const Autocomplete = (props: AutocompleteProps<Security>) => {
  const { list, filterByKey, setTicker, cleanInput, setCleanInput } = props;
  const [selectedInput, setSelectedInput] = useState("");
  const { securities } = useAppSelector((state) => state.data);
  // нужно для отслеживания, нахождения внутри инпут
  const refSelectedInput = useRef(null);
  // если все не подходит значит набирает не правильное имя
  const noOptions = list.every(
    (company) => filterByKey(securities[company.secid], selectedInput) === false
  );
  // нажатие на элемент из списка, устанавливается ticker и инпут
  const onClickSelectedItem = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    ticker: string
  ) => {
    const target = e.target as HTMLElement;
    setSelectedInput(target.innerText);
    setTicker(ticker);
  };
  // в интпуте x удаляются данные из инпута и тикер удалятся
  const onClickCleanInput = () => {
    setSelectedInput("");
    setTicker("");
  };

  useEffect(() => {
    //если cleanInput true => обнуляем setTicer и selectedInput
    if (cleanInput) {
      setSelectedInput("");
      setTicker("");
    }
    // меняем обратно на false
    setCleanInput(false);
    //если выделить всю строку в инпуте и заменить на 1 символ должны удалить ticket
    if (selectedInput.length < 2 || noOptions) {
      setTicker("");
    }
    // при нажатии на клавиатуру backspace удаляем ticket
    const pressKeydownBackspace = (event: KeyboardEvent) => {
      // проверяем что мы находимся внутри input
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
    document.addEventListener("keydown", pressKeydownBackspace);
    return () => {
      document.removeEventListener("keydown", pressKeydownBackspace);
    };
  }, [cleanInput, setCleanInput, setTicker, selectedInput]);

  return (
    <div className={s.Autocomplete}>
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
              return (
                `${company.secid} ${company.shortname}` !== selectedInput && (
                  <li
                    key={company.secid}
                    className={s.company}
                    onClick={(e) => onClickSelectedItem(e, company.secid)}
                  >
                    {company.secid} {company.shortname}
                  </li>
                )
              );
            })}
          {/* показываем пользователю что он не правильно набрал */}
          {noOptions && <li>Нет вариантов</li>}
        </ul>
      )}
      {selectedInput && (
        <button className={s.button} onClick={onClickCleanInput}></button>
      )}
    </div>
  );
};

export { Autocomplete };

// поведение
// когда в инпуте удаляешь хотябы одну букву то ticker должен быть ""
// происходит сброс , и заново надо выбрать

// перемещаться по списку с помощью клавиатуры down или up
// при перемещении строка должна быть выделена
// при фокусе на мышку, выделение строки должно быть снято и переключено на мышку
// при нажатии на enter компания должна быть выбрана


//! если выбрать слово полностью и потом удалить и набрать букву, слово не показывается хотя подходит