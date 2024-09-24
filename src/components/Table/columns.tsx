import { StockNumberInput } from "../StockNumberInput/StockNumberInput";

interface Column {
  ticker: string;
  shortnames: string;
  weight: number;
  price: number;
}

interface Columns {
  header: string;
  cell: (arg: Column) => React.ReactNode;
}

export const columns: Columns[] = [
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
    cell: (column: Column) => column.price,
  },
  {
    header: "Куплено акций",
    cell: (column: Column) => <StockNumberInput ticker={column.ticker} />,
  },
];
