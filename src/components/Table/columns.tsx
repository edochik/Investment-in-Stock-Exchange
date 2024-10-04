import s from "./Table.module.scss";
import { CoefficientInput } from "../CoefficientInput/CoefficientInput";
import { StockNumberInput } from "../StockNumberInput/StockNumberInput";

export interface Value {
  ticker: string;
  shortnames: string;
  weight: number;
  price: number;
  totalStocksBuyUser: number;
  weightPortfolio: number;
  totalStockBuyTarget: number;
  stocksBuyUser: number;
  stockBuyTarget: number;
  progressTarget: number;
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
          src={`./Investment-in-Stock-Exchange/images/${value.ticker}.png`}
          alt={`Логотип ${value.shortnames}`}
        />
        <p className={s.text}>{value.ticker}</p>
      </div>
    ),
    sortFunction: (a, b) => b.ticker.localeCompare(a.ticker),
  },
  {
    header: "Название компании",
    cell: (value) => value.shortnames,
    sortFunction: (a, b) => b.shortnames.localeCompare(a.shortnames),
  },
  {
    header: "Вес компании",
    cell: (value) => `${value.weight.toFixed(2)}%`,
    sortFunction: (a, b) => b.weight - a.weight,
  },
  {
    header: "Цена",
    cell: (value) => `${value.price} ₽`,
  },
  {
    header: "Куплено акций (шт)",
    cell: (value) => (
      <StockNumberInput ticker={value.ticker} stocks={value.stocksBuyUser} />
    ),
  },
  {
    header: "Сумма купленных акций",
    cell: (value) => Math.round(value.totalStocksBuyUser),
    sortFunction: (a, b) => b.totalStocksBuyUser - a.totalStocksBuyUser,
  },
  {
    header: "Коэффициент",
    cell: (value) => <CoefficientInput ticker={value.ticker} />,
  },
  {
    header: "Вес акций в портфеле",
    cell: (value) => `${value.weightPortfolio.toFixed(2)}%`,
    sortFunction: (a, b) => b.weightPortfolio - a.weightPortfolio,
  },
  {
    header: "Купить акций(шт)",
    cell: (value) => Math.round(value.stockBuyTarget),
    sortFunction: (a, b) => b.stockBuyTarget - a.stockBuyTarget,
  },
  {
    header: "Итого за акции",
    cell: (value) => Math.round(value.totalStockBuyTarget),
    sortFunction: (a, b) => b.totalStockBuyTarget - a.totalStockBuyTarget,
  },
  {
    header: "Цель достигнута в %",
    cell: (value) => {
      return !Number.isFinite(value.progressTarget)
        ? 0
        : Math.round(value.progressTarget);
    },
  },
];
