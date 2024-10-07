import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCompanyCart } from "../../redux/cartSlice/cartSlice";
import { removedCompanyImoex } from "../../redux/initialDataSlice/initialDataSlice";
import { removedCompanyNonImoex } from "../../redux/nonImoexCompanySlice/nonImoexCompanySlice";
import s from "./RemovedCompany.module.scss";
interface RemoveCompanyProps {
  ticker: string;
}

const RemovedCompany = ({ ticker }: RemoveCompanyProps) => {
  const dispatch = useAppDispatch();
  const { imoex } = useAppSelector((state) => state.data);
  const nonImoex = useAppSelector((state) => state.nonImoexCompany);
  const cart = useAppSelector((state) => state.cart);
  const onClickRemove = (ticker: string) => {
    const company = imoex
      .concat(nonImoex)
      .find((company) => company.ticker === ticker);
    if (company !== undefined) {
      dispatch(addCompanyCart(company));
    }
    dispatch(removedCompanyImoex(ticker));
    dispatch(removedCompanyNonImoex(ticker));
  };
  return (
    <button className={s.button} onClick={() => onClickRemove(ticker)}>
      🛒
    </button>
  );
};

export { RemovedCompany };
