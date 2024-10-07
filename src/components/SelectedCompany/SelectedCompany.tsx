import { useState } from "react";
import s from "./SelectedCompany.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFilterCompany } from "./getFilterCompany";
import { selectedNonImoex } from "../../redux/nonImoexCompanySlice/nonImoexCompanySlice";
const SelectedCompany = () => {
  const [inputValues, setInputValues] = useState("");
  const [ticker, setTicker] = useState("");
  const [weight, setWeight] = useState("");
  const dispatch = useAppDispatch();
  const { securities, imoex } = useAppSelector((state) => state.data);
  const nonImoexCompany = useAppSelector((state) => state.nonImoexCompany);
  const companies = getFilterCompany(securities, imoex.concat(nonImoexCompany));

  const onClickSelectedCompany = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ticker: string
  ) => {
    const target = e.target as HTMLElement; //?? возникает ошибка
    setTicker(securities[ticker].secid);
    setInputValues(target.innerText);
  };

  const onClickAddCompany = () => {
    const { shortname, secid, prevdate } = securities[ticker];
    dispatch(
      selectedNonImoex({
        indexid: "NONIMOEX",
        tradedate: prevdate,
        ticker: secid,
        shortnames: shortname,
        secids: secid,
        weight: Number(weight),
        tradingsession: 0,
      })
    );
    setInputValues("");
    setTicker("");
    setWeight("");
  };

  const handleChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^[0-9.]*$/.test(value)) {
      return;
    }
    const valueAsNumber = Number(value);
    if (!Number.isNaN(valueAsNumber)) {
      setWeight(value);
    }
  };

  return (
    <div className={s.SelectedCompany}>
      <div className={s.wrapper}>
        <label className={s.label}>
          Введите название:
          <div className={s.inner}>
            <input
              className={s.input}
              type="text"
              value={inputValues}
              onChange={(e) => setInputValues(e.target.value)}
            />
            <div className={s.list}>
              {inputValues.length > 1 &&
                companies
                  .filter((company) =>
                    company.shortname
                      .toLocaleLowerCase()
                      .includes(inputValues.toLocaleLowerCase())
                  )
                  .map((company) =>
                    company.shortname !== inputValues ? (
                      <div
                        key={company.shortname}
                        className={s.company}
                        onClick={(e) =>
                          onClickSelectedCompany(e, company.secid)
                        }
                      >
                        {company.shortname}
                      </div>
                    ) : null
                  )}
            </div>
          </div>
        </label>
        <label className={s.label}>
          Введите вес компании:
          <input
            className={s.input}
            type="text"
            value={weight}
            onChange={(e) => handleChangeWeight(e)}
          />
        </label>
        <button
          className={s.btn_add}
          onClick={onClickAddCompany}
          disabled={!securities[ticker] || weight.length === 0}
        >
          Добавить компанию
        </button>
      </div>
    </div>
  );
};

export { SelectedCompany };
