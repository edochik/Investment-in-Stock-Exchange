import s from "./UserMoneyInput.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUserMoney } from "../../redux/userDataSlice/userDataSlice";
import { formatPrice } from "./formatPrice";
import classNames from "classnames";

const UserMoneyInput = () => {
  const money = useAppSelector((state) => state.userData.moneyUser);
  const dispatch = useAppDispatch();

  const handleChangeUpdateMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replaceAll(" ", ""));
    dispatch(updateUserMoney(value));
  };

  return (
    <label className={s.UserMoneyInput}>
      Цель:&nbsp;
      <input
        type="text"
        className={s.input}
        value={formatPrice(money)}
        onChange={(e) => handleChangeUpdateMoney(e)}
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

// className={classNames({
//   [s.button]: true,
//   [s.show]: column === selectedColumn.column,
//   [s.rotate]: selectedColumn.direction === "desc",
// })}

export { UserMoneyInput };
