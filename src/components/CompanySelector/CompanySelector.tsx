import { useRef, useState } from "react";
import s from "./CompanySelector.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { filterByImoex } from "./filterByImoex";
import { selectedNonImoex } from "../../redux/nonImoexCompanySlice/nonImoexCompanySlice";
import { Autocomplete } from "../Autocomplete/Autocomplete";

const CompanySelector = () => {
  const [ticker, setTicker] = useState("");
  const [inputWeight, setInputWeight] = useState("");
  const dispatch = useAppDispatch();
  const { securities, imoex } = useAppSelector((state) => state.data);
  const nonImoexCompany = useAppSelector((state) => state.nonImoexCompany);
  const companies = filterByImoex(securities, imoex.concat(nonImoexCompany));
  //для работы с кнопкой добавить компанию, когда нажимаем чтобы произошла очистка в input
  //для этого вешаем ref на элемент, чтобы понимать что нажали на кнопку
  const refBtnAddCompany = useRef(null);

  const onClickAddCompany = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { shortname, secid, prevdate } = securities[ticker];
    dispatch(
      selectedNonImoex({
        indexid: "NONIMOEX",
        tradedate: prevdate,
        ticker: secid,
        shortnames: shortname,
        secids: secid,
        weight: Number(inputWeight),
        tradingsession: 0,
      })
    );
    setTicker("");
    setInputWeight("");
  };

  const handleChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^[0-9.]*$/.test(value)) {
      return;
    }
    const valueAsNumber = Number(value);
    if (!Number.isNaN(valueAsNumber)) {
      setInputWeight(value);
    }
  };

  return (
    <div className={s.SelectedCompany}>
      <div className={s.wrapper}>
        <label className={s.label}>
          Введите название:
          <div className={s.inner}>
            <Autocomplete
              list={companies} 
              filterByKey={(
                element,
                query
              ) =>
                element.secid.toLowerCase().startsWith(query.toLowerCase()) ||
                element.shortname.toLowerCase().startsWith(query.toLowerCase())
              }
              showElements={(element) =>
                `${element.secid} ${element.shortname}`
              }
              value={ticker}
              // setValue={setTicker}
            />
          </div>
        </label>
        <label className={s.label}>
          Введите вес компании:
          <input
            className={s.input}
            type="text"
            value={inputWeight}
            onChange={(e) => handleChangeWeight(e)}
          />
        </label>
        <button
          ref={refBtnAddCompany}
          className={s.btn_add}
          onClick={onClickAddCompany}
          disabled={!securities[ticker] || inputWeight.length === 0}
        >
          Добавить компанию
        </button>
      </div>
    </div>
  );
};

export { CompanySelector };
