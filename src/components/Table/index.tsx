import s from "./Table.module.scss";
import { translation } from "../../utils/data";
import { Imoex } from "../../redux/slicer/imoexSlicer";
import { useAppSelector } from "../../hooks";
import { Securities } from "../../redux/slicer/securitiesSlicer.js";

type Headers = (keyof Imoex | keyof Securities)[];
const mergeHeaders: Headers = [
  "ticker",
  "shortnames",
  "weight",
  "prevwaprice",
  "lotsize",
];


const Table = () => {
  const { loading } = useAppSelector((state) => state.moex);
  const imoex = useAppSelector((state) => state.moex.moex.imoex).slice(0, 20);
  const securities = useAppSelector((state) => state.moex.moex.securities);
  return (
    <>
      {loading === "pending" ? (
        <div>...Loading</div>
      ) : (
        <table className={s.table}>
          <thead className={s.thead}>
            <tr className={s.tr}>
              <th className={s.th}>№</th>
              {mergeHeaders.map((header, index) => (
                <th className={s.th} scope="col" key={index}>
                  {translation[header]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={s.tbody}>
            {imoex.map((company, index) => {
              const ticker = company.secids;
              return (
                <tr className={s.tr} key={company.ticker}>
                  <th className={s.th}>{index}</th>
                  {mergeHeaders.map((header, headerIndex) => (
                    <th className={s.th} key={company.ticker + headerIndex}>
                      {company[header as keyof Imoex]
                        ? company[header as keyof Imoex]
                        : securities[ticker][header as keyof Securities]}
                    </th>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export { Table };
