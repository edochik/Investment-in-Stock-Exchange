import { ImoexSecurity } from "../../domain/ImoexSecurity";
import { Security } from "../../domain/securitiy";
import s from "./Table.module.scss";
type Column = ImoexSecurity & Security;

interface Header<T> {
  header: string;
  cell: (arg1: T) => string | number | JSX.Element;
}

export const columns: Header<Column>[] = [
  {
    header: "Тикер",
    cell: (column: Column) => column.ticker,
  },
  {
    header: "Название компании",
    cell: (column: Column) => column.shortnames,
  },
  {
    header: "Вес",
    cell: (column: Column) => `${column.weight}%`,
  },
  {
    header: "Цена",
    cell: (column: Column) => column.prevprice,
  },
  {
    header: "Куплено акций",
    cell: (column: Column) => (
      <input className={s.input} type="text" id={column.ticker} />
    ),
  },
  {
    header: "Коэф-т",
    cell: (column: Column) => (
      <input className={s.input} type="text" id={column.ticker} />
    ),
  },
];
