import { memo, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCompanyCart } from "../../redux/cartSlice/cartSlice";
import { removedImoex } from "../../redux/initialDataSlice/initialDataSlice";
import { removedNonImoex } from "../../redux/nonImoexCompanySlice/nonImoexCompanySlice";
import s from "./RemovedCompany.module.scss";
interface RemoveCompanyProps {
  ticker: string;
}

const RemovedCompany = ({ ticker }: RemoveCompanyProps) => {
  const dispatch = useAppDispatch();
  const { imoex } = useAppSelector((state) => state.data);
  const nonImoex = useAppSelector((state) => state.nonImoexCompany);

  const onClickRemove = (ticker: string) => {
    const company = imoex
      .concat(nonImoex)
      .find((company) => company.ticker === ticker);
    if (company !== undefined) {
      const { indexid } = company;
      dispatch(addCompanyCart(company));
      dispatch(removedImoex({ ticker, type: indexid }));
      dispatch(removedNonImoex({ ticker, type: indexid }));
    }
  };
  return (
    <button className={s.button} onClick={() => onClickRemove(ticker)}>
      🛒
    </button>
  );
};

export { RemovedCompany };
