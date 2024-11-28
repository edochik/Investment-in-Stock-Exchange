import s from "./UserMoneyInput.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUserMoney } from "../../redux/userDataSlice/userDataSlice";
import { formatPrice } from "./formatPrice";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

const UserMoneyInput = () => {
  const money = useAppSelector((state) => state.userData.moneyUser);
  const dispatch = useAppDispatch();
  const [cursorPosition, setCursorPosition] = useState(0); // Состояние для отслеживания позиции курсора
  const inputRef = useRef<HTMLInputElement>(null); // Реф для поля ввода
  const handleChangeUpdateMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replaceAll(" ", "").replace("₽", ""));
    dispatch(updateUserMoney(value));
  };

  useEffect(() => {
    if (inputRef.current) {
      const cursorPos = inputRef.current.value.length - 2;
      inputRef.current.setSelectionRange(cursorPos, cursorPos);
    }
  }, [money]);
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const position = e.target.selectionStart || 0;
    setCursorPosition(position);
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const position = (e.target as HTMLInputElement).selectionStart || 0;
    setCursorPosition(position);
  };

  return (
    <label className={s.UserMoneyInput}>
      Цель:&nbsp;
      <input
        ref={inputRef}
        type="text"
        className={s.input}
        value={`${formatPrice(money)} ₽`}
        onChange={(e) => handleChangeUpdateMoney(e)}
        onFocus={handleFocus}
        onSelect={handleSelect}
      />
      <span
        className={classNames({
          [s.info]: true,
          [s.hidden]: money > 9999,
        })}
        aria-label={money < 9999 ? "Введите сумму от 10 000 рублей" : ""}
      >
        *Введите сумму от 10 000 рублей
      </span>
    </label>
  );
};

export { UserMoneyInput };
