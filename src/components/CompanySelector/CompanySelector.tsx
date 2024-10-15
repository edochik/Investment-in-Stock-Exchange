import { useRef, useState } from "react";
import s from "./CompanySelector.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { filterByImoex } from "./filterByImoex";
import { selectedNonImoex } from "../../redux/nonImoexCompanySlice/nonImoexCompanySlice";
import { Autocomplete } from "../Autocomplete/Autocomplete";
import { Security } from "../../domain/Security";

const CompanySelector = () => {
  const [ticker, setTicker] = useState<Security | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [inputWeight, setInputWeight] = useState("");
  const dispatch = useAppDispatch();
  const { securities, imoex } = useAppSelector((state) => state.data);
  const nonImoexCompany = useAppSelector((state) => state.nonImoexCompany);
  const companies = filterByImoex(securities, imoex.concat(nonImoexCompany));
  //для работы с кнопкой добавить компанию, когда нажимаем чтобы произошла очистка в input
  //для этого вешаем ref на элемент, чтобы понимать что нажали на кнопку
  const refBtnAddCompany = useRef(null);
  console.log(ticker === null && inputWeight.length === 0);
  console.log(ticker === null, inputWeight.length === 0);
  const onClickAddCompany = (ticker: Security | null) => {
    if (ticker !== null) {
      const { shortname, secid, prevdate } = ticker;
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
      setTicker(null);
      setInputWeight("");
    }
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
          <Autocomplete
            list={companies}
            filterByKey={(element, query) =>
              element.secid.toLowerCase().startsWith(query.toLowerCase()) ||
              element.shortname.toLowerCase().startsWith(query.toLowerCase())
            }
            showElement={(element) => `${element.secid} ${element.shortname}`}
            value={ticker}
            setValue={setTicker}
          />
        </label>
        <label className={s.label}>
          Выберите цвет:
          <Autocomplete
            list={["red", "blue", "green"]}
            filterByKey={(element, query) =>
              element.toLowerCase().includes(query.toLowerCase())
            }
            showElement={(element) => element}
            value={color}
            setValue={setColor}
          />
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
          onClick={() => onClickAddCompany(ticker)}
          disabled={ticker === null || inputWeight.length === 0}
        >
          Добавить компанию
        </button>
      </div>
    </div>
  );
};

export { CompanySelector };
