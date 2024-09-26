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
    table: Row[],
    weightCompanies: Record<string, Record<string, string>>,
    totalWeight: number,
    target: number
  ) => React.ReactNode;
}

export const columns: Columns[] = [
  {
    header: "Тикер",
    cell: (row) => row.ticker,
  },
  {
    header: "Название компании",
    cell: (row) => row.shortnames,
  },
  {
    header: "Вес",
    cell: (row, _, __, weightCompanies) => {
      return `${weightCompanies[row.ticker].weightNew}%`;
    },
  },
  {
    header: "Цена",
    cell: (row) => row.price,
  },
  {
    header: "Куплено акций",
    cell: (row) => <StockNumberInput ticker={row.ticker} />,
  },
  {
    header: "Куплено стоимость позиции",
    cell: (row, sumStocks) => {
      return sumStocks[row.ticker] ? row.price * sumStocks[row.ticker] : 0;
    },
  },
  {
    header: "Коэффициент",
    cell: (row) => <CoefficientInput ticker={row.ticker} />,
  },
  {
    header: "Мой Вес (нормализовано)",
    cell: (row, _, __, weightCompanies, totalWeight) => {
      const result =
        Number(weightCompanies[row.ticker].weightNew) * (1 / totalWeight);
      return `${(result * 100).toFixed(2)}%`;
    },
  },
  {
    header: "Акций Купить (нормализовано по тек.ценам)",
    cell: (row, _, __, weightCompanies, totalWeight, target) => {
      const test =
        Number(weightCompanies[row.ticker].weightNew) * (1 / totalWeight) * 100;
      const result =
        (target * test) /
        (row.price * 100);
      return `${Math.round(result)}`;
    },
  },
];
