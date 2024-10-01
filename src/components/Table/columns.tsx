import s from "./Table.module.scss";
import { CoefficientInput } from "../CoefficientInput/CoefficientInput";
import { StockNumberInput } from "../StockNumberInput/StockNumberInput";

export interface Value {
  ticker: string;
  shortnames: string;
  weight: number;
  price: number;
  stocks: Record<string, number>;
  stocksBuyUser: number;
  weightPortfolio: number;
  aroundStockOnLotsize: number;
  totalSum: number;
  stockBuyTarget: number;
  progressToTarget: number;
}

export interface Columns {
  header: string;
  cell: (value: Value) => React.ReactNode;
  sortFunction?: (a: Value, b: Value) => number;
}

export const columns: Columns[] = [
  {
    header: "Тикер",
    cell: (value) => (
      <div className={s.ticker}>
        <img
          className={s.image}
          src={`/images/${value.ticker}.png`}
          alt={`Логотип ${value.ticker}`}
        />
        <p className={s.text}>{value.ticker}</p>
      </div>
    ),
    sortFunction: (a, b) => a.ticker.localeCompare(b.ticker),
  },
  {
    header: "Название компании",
    cell: (value) => value.shortnames,
  },
  {
    header: "Вес компании",
    cell: (value) => {
      return `${value.weight.toFixed(2)}%`;
    },
  },
  {
    header: "Цена",
    cell: (value) => `${value.price} ₽`,
  },
  {
    header: "Куплено акций (шт)",
    cell: (value) => <StockNumberInput ticker={value.ticker} />,
  },
  {
    header: "Сумма купленных акций",
    cell: (value) => {
      return Math.round(value.stocksBuyUser * value.price);
    },
  },
  {
    header: "Коэффициент",
    cell: (value) => <CoefficientInput ticker={value.ticker} />,
  },
  {
    header: "Вес акций в портфеле",
    cell: (value) => {
      return `${value.weightPortfolio.toFixed(2)}%`;
    },
  },
  {
    header: "Купить акций(шт)",
    cell: (value) => Math.round(value.stockBuyTarget),
  },
  {
    header: "Итого за акции",
    cell: (value) => Math.round(value.totalSum),
  },
  {
    header: "Цель достигнута в %",
    cell: (value) => {
      return !Number.isFinite(value.progressToTarget)
        ? 0
        : Math.round(value.progressToTarget);
    },
  },
];
