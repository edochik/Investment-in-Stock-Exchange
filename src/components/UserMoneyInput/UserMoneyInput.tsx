import s from "./UserMoneyInput.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addUserMoneyInput } from "../../redux/userDataSlice/userDataSlice";

const UserMoneyInput = () => {
  const dispatch = useAppDispatch();
  const target = useAppSelector((state) => state.userData.UserMoneyInput);
  return (
    <input
      className={s.UserMoneyInput}
      value={target}
      onChange={(e) => dispatch(addUserMoneyInput(Number(e.target.value)))}
    />
  );
};

export { UserMoneyInput };
