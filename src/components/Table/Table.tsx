import s from "./Table.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { columns } from "./helper";
import { addStocks } from "../../redux/stocksUserSlice/stocksUserSlice";
import { useState } from "react";

export const Table = () => {
  const { loading, imoex, securities } = useAppSelector((state) => state.data);
  const table = imoex
    .map((item) => Object.assign({}, item, securities[item.secids]))
    .slice(0, 15);


  if (loading === "pending") {
    return <div>...Loading</div>;
  }



  return (
    <>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            <th className={s.th}>№</th>
            {columns.map((column, index) => (
              <th key={index} className={s.th}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {table.map((row, index) => (
            <tr className={s.tr} key={index}>
              <td className={s.td}>{index + 1}</td>
              {columns.map((column) => (
                <td className={s.td}>{column.cell(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
