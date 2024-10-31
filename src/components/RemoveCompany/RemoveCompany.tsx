import { useAppDispatch } from "../../hooks";
import { addCompanyToCart } from "../../redux/cartSlice/cartSlice";
import s from "./RemoveCompany.module.scss";
interface RemoveCompanyProps {
  ticker: string;
}

const RemoveCompany = ({ ticker }: RemoveCompanyProps) => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={s.button}
      onClick={() => dispatch(addCompanyToCart(ticker))}
      data-testid={`ticker-${ticker}`}
    >
      🛒
    </button>
  );
};

export { RemoveCompany };
