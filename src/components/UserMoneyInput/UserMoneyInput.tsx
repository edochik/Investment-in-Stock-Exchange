import s from "./UserMoneyInput.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUserMoney } from "../../redux/userDataSlice/userDataSlice";
import { useState } from "react";
import { formatPrice } from "./formatPrice";

const UserMoneyInput = () => {
  const money = useAppSelector((state) => state.userData.moneyUser);
  const [userMoney, setUserMoney] = useState(formatPrice(money));
  const dispatch = useAppDispatch();
  const handleChangeUpdateMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replaceAll(" ", ""));
    setUserMoney(formatPrice(value));
    dispatch(updateUserMoney(value));
  };
  return (
    <div className={s.UserMoneyInput}>
      <p className={s.target}>Цель: </p>
      <input
        type="text"
        className={s.input}
        value={userMoney}
        onChange={(e) => handleChangeUpdateMoney(e)}
      />
    </div>
  );
};

export { UserMoneyInput };
