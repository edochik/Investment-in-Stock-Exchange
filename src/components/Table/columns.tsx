import { CoefficientInput } from "../CoefficientInput/CoefficientInput";
import { StockNumberInput } from "../StockNumberInput/StockNumberInput";

interface Row {
  ticker: string;
  shortnames: string;
  weight: number;
  price: number;
}

interface Columns {
  header: string;
  cell: (
    row: Row,
    sumStocks: Record<string, number>,
    coefficient: Record<string, string>,
    table: Row[]
  ) => React.ReactNode;
}

export const columns: Columns[] = [
  {
    header: "Тикер",
    cell: (row: Row) => row.ticker,
  },
  {
    header: "Название компании",
    cell: (row: Row) => row.shortnames,
  },
  {
    header: "Вес",
    cell: (
      row: Row,
      sumStocks: Record<string, number>,
      coefficient: Record<string, string>
    ) => {
      return coefficient[row.ticker]
        ? `${Number(coefficient[row.ticker]) * row.weight}%`
        : `${row.weight}%`;
    },
  },
  {
    header: "Цена",
    cell: (row: Row) => row.price,
  },
  {
    header: "Куплено акций",
    cell: (row: Row) => <StockNumberInput ticker={row.ticker} />,
  },
  {
    header: "Куплено стоимость позиции",
    cell: (row: Row, sumStocks: Record<string, number>) => {
      return sumStocks[row.ticker] ? row.price * sumStocks[row.ticker] : 0;
    },
  },
  {
    header: "Коэффициент",
    cell: (row: Row) => <CoefficientInput ticker={row.ticker} />,
  },
  {
    header: "Мой Вес (нормализовано)",
    cell: (
      row: Row,
      sumStocks: Record<string, number>,
      coefficient: Record<string, string>,
      table: Row[]
    ) => {
      const result = table.map((row) =>
        coefficient[row.ticker]
          ? {
              ...row,
              weight: Number(coefficient[row.ticker]) * Number(row.weight),
            }
          : row
      );
      const total = result.reduce((acc, row) => acc + Number(row.weight), 0);
      const test = result.find((item) => item.ticker === row.ticker)?.weight;
      return (Number(test) * (1 / total) * 100).toFixed(2);
    },
  },
];
