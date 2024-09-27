import { CoefficientInput } from "../CoefficientInput/CoefficientInput";
import { StockNumberInput } from "../StockNumberInput/StockNumberInput";
export interface RowValues {
  ticker: string;
  shortnames: string;
  weight: number;
  price: number;
  buyStocks: number;
  userWeight: number;
  targetBuyStocks: number;
  targetSumStocks: number;
  targetStockPercent: number;
}

interface Columns {
  header: string;
  cell: (rowValues: RowValues) => React.ReactNode;
}

export const columns: Columns[] = [
  {
    header: "Тикер",
    cell: (rowValues) => rowValues.ticker,
  },
  {
    header: "Название компании",
    cell: (rowValues) => rowValues.shortnames,
  },
  {
    header: "Вес компании",
    cell: (rowValues) => {
      return `${rowValues.weight}%`;
    },
  },
  {
    header: "Цена",
    cell: (rowValues) => `${rowValues.price} ₽`,
  },
  {
    header: "Куплено акций (шт)",
    cell: (rowValues) => <StockNumberInput ticker={rowValues.ticker} />,
  },
  {
    header: "Сумма купленных акций",
    cell: (row) => {
      return row.buyStocks * row.price;
    },
  },
  {
    header: "Коэффициент",
    cell: (rowValues) => <CoefficientInput ticker={rowValues.ticker} />,
  },
  {
    header: "Вес акций в портфеле",
    cell: (row) => {
      return `${row.userWeight.toFixed(2)}%`;
    },
  },
  {
    header: "Купить акций(шт)",
    cell: (row) => {
      return row.targetBuyStocks;
    },
  },
  {
    header: "Сумма купленных акций",
    cell: (row) => {
      return `${row.targetSumStocks} ₽`;
    },
  },
  {
    header: "Купить акций",
    cell: (row) => {
      return isNaN(row.targetStockPercent) ? 0 : row.targetStockPercent;
    },
  },
];
