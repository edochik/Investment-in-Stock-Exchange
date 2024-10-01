import s from "./UserMoneyInput.module.scss";
import { useAppDispatch } from "../../hooks";
import { updateUserMoney } from "../../redux/userDataSlice/userDataSlice";
import { useState } from "react";
import { formatPrice } from "./formatPrice";

const UserMoneyInput = () => {
  const [userMoney, setUserMoney] = useState("");
  const dispatch = useAppDispatch();
  const handleChangeUpdateMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value.replaceAll(" ", ""));
    setUserMoney(formatPrice(newValue)); // => строка
    dispatch(updateUserMoney(newValue)); // => число
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
