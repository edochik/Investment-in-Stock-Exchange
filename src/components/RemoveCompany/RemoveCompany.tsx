import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCompanyToCart } from "../../redux/cartSlice/cartSlice";
import s from "./RemoveCompany.module.scss";
interface RemoveCompanyProps {
  ticker: string;
}

const RemoveCompany = ({ ticker }: RemoveCompanyProps) => {
  const dispatch = useAppDispatch();
  const onClickRemove = (ticker: string) => {
    dispatch(addCompanyToCart(ticker));
  };
  return (
    <button className={s.button} onClick={() => onClickRemove(ticker)}>
      🛒
    </button>
  );
};

export { RemoveCompany };
