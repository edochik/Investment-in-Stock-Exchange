import s from "./Table.module.scss";
import { useAppSelector } from "../../hooks";
import { columns } from "./columns";
import { useState } from "react";

export const Table = () => {
  const { loading, imoex, securities } = useAppSelector((state) => state.data);
  const table = useAppSelector((state) => state.table);
  const sumStocks = useAppSelector((state) => state.sumStocks);
  const weightCompanies = useAppSelector(
    (state) => state.weights.weightCompanies
  );
  const totalWeight = useAppSelector((state) => state.weights.totalWeight);
  const [target, setTarget] = useState(1000_000);
  
  if (loading === "pending") {
    return <div>...Loading</div>;
  }

  return (
    <>
      <input
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
      />
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            {columns.map((column, index) => (
              <th key={index} className={s.tr}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {table.map((row, ind) => (
            <tr key={ind} className={s.tr}>
              {columns.map((column, index) => (
                <th key={index} className={s.th}>
                  {column.cell(
                    row,
                    sumStocks,
                    table,
                    weightCompanies,
                    totalWeight,
                    target
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
