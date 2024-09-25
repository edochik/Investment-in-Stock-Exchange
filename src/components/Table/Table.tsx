import s from "./Table.module.scss";
import { useAppSelector } from "../../hooks";
import { columns } from "./columns";
import { useState } from "react";

export const Table = () => {
  const { loading, imoex, securities } = useAppSelector((state) => state.data);
  const sumStocks = useAppSelector((state) => state.sumStocks);
  const coefficient = useAppSelector((state) => state.coefficient);
  // в срез положить, а потом менять позицию по весу.
  const table = imoex.map((company) => {
    const { ticker, shortnames, weight } = company;
    const price = securities[ticker].prevprice;
    return { ticker, shortnames, weight, price };
  });

  const totalWeight = table.reduce((acc, row) => acc + row.weight, 0);

  if (loading === "pending") {
    return <div>...Loading</div>;
  }

  return (
    <>
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
                  {column.cell(row, sumStocks, coefficient, totalWeight)}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
