import s from "./UserMoneyInput.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUserMoney } from "../../redux/userDataSlice/userDataSlice";
import { formatPrice } from "./formatPrice";

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
    </label>
  );
};

export { UserMoneyInput };
