import { useState } from "react";
import s from "./CompanySelector.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { filterBySecurities } from "./filterBySecurities";
import { selectedNonImoex } from "../../redux/nonImoexCompanySlice/nonImoexCompanySlice";
import { Autocomplete } from "../Autocomplete/Autocomplete";
import { Security } from "../../domain/Security";
import { RenderLogo } from "../RenderLogo/RenderLogo";

const CompanySelector = () => {
  const [selectedSecurity, setSelectedSecurity] = useState<Security | null>(
    null
  );
  const [inputWeight, setInputWeight] = useState("");
  const dispatch = useAppDispatch();
  const { securities, imoex } = useAppSelector((state) => state.data);
  const nonImoexCompany = useAppSelector((state) => state.nonImoexCompany);
  const companies = filterBySecurities(
    securities,
    imoex.concat(nonImoexCompany)
  );

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { shortname, secid, prevdate } = selectedSecurity!;
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
    setSelectedSecurity(null);
    setInputWeight("");
  };

  return (
    <div className={s.SelectedCompany}>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          Введите название:
          <Autocomplete
            // мы даем ключ каждый раз разный в зависимости от ценных бумаг, как итог происходит перерендер компонента, что визуально выглядит как удаление написаного, так как компонент уже другой
            key={selectedSecurity?.secid}
            items={companies}
            filterByKey={({ secid, shortname }, query) =>
              [secid, shortname].some((val) =>
                val.toLowerCase().startsWith(query.toLowerCase())
              )
            }
            render={({ secid, shortname }) => (
              <>
                <RenderLogo secid={secid} shortname={shortname} />
                <p className={s.text}>
                  {secid} {shortname}
                </p>
              </>
            )}
            value={selectedSecurity}
            setValue={setSelectedSecurity}
            inputStringValue={({ secid }) => secid}
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
          type="submit"
          className={s.btn_add}
          disabled={selectedSecurity === null || inputWeight.length === 0}
        >
          Добавить компанию
        </button>
      </form>
    </div>
  );
};

export { CompanySelector };
