// import { memo, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCompanyToCart } from "../../redux/cartSlice/cartSlice";
import { removeImoex } from "../../redux/initialDataSlice/initialDataSlice";
import { removeNonImex } from "../../redux/nonImoexCompanySlice/nonImoexCompanySlice";
import s from "./RemoveCompany.module.scss";
interface RemoveCompanyProps {
  ticker: string;
}

const RemoveCompany = ({ ticker }: RemoveCompanyProps) => {
  const dispatch = useAppDispatch();
  const { imoex } = useAppSelector((state) => state.data);
  const nonImoex = useAppSelector((state) => state.nonImoexCompany);

  const onClickRemove = (ticker: string) => {
    const company = imoex
      .concat(nonImoex)
      .find((company) => company.ticker === ticker);
    if (company !== undefined) {
      const { indexid } = company;
      dispatch(addCompanyToCart(company));
      dispatch(removeImoex({ ticker, type: indexid }));
      dispatch(removeNonImex({ ticker, type: indexid }));
    }
  };
  return (
    <button className={s.button} onClick={() => onClickRemove(ticker)}>
      🛒
    </button>
  );
};

export { RemoveCompany };
