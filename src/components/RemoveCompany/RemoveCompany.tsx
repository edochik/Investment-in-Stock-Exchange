import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCompanyToCart } from "../../redux/cartSlice/cartSlice";
import s from "./RemoveCompany.module.scss";
interface RemoveCompanyProps {
  ticker: string;
}

const RemoveCompany = ({ ticker }: RemoveCompanyProps) => {
  const dispatch = useAppDispatch();
  const { imoex } = useAppSelector((state) => state.data);
  const nonImoex = useAppSelector((state) => state.nonImoex);

  const onClickRemove = (ticker: string) => {
    const company = imoex
      .concat(nonImoex)
      .find((company) => company.ticker === ticker);
    if (company !== undefined) {
      dispatch(addCompanyToCart(ticker));
    }
  };
  return (
    <button className={s.button} onClick={() => onClickRemove(ticker)}>
      🛒
    </button>
  );
};

export { RemoveCompany };
