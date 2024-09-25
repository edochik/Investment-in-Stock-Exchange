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
    totalWeigth: number,
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
        ? `${roundNumber(Number(coefficient[row.ticker]) * row.weight)}%`
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
      return sumStocks[row.ticker]
        ? roundNumber(row.price * sumStocks[row.ticker])
        : 0;
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
      totalWeight: number,
    ) => {
      return coefficient[row.ticker]
        ? roundNumber(Number(coefficient[row.ticker]) * row.weight) *
            (1 / totalWeight)
        : row.weight * (1 / totalWeight);
    },
  },
];

function roundNumber(num: number) {
  return Number.isInteger(num) ? num : Number(num.toFixed(2));
}
