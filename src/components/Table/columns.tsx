import s from "./Table.module.scss";
import { CoefficientInput } from "../CoefficientInput/CoefficientInput";
import { StockNumberInput } from "../StockNumberInput/StockNumberInput";
import { RemoveCompany } from "../RemoveCompany/RemoveCompany";
import { RenderLogo } from "../RenderLogo/RenderLogo";

export interface Value {
  ticker: string;
  shortname: string;
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
        <RenderLogo secid={value.ticker} shortname={value.shortname} />
        <p className={s.text}>{value.ticker}</p>
      </div>
    ),
    sortFunction: (a, b) => b.ticker.localeCompare(a.ticker),
  },
  {
    header: "Название компании",
    cell: (value) => value.shortname,
    sortFunction: (a, b) => b.shortname.localeCompare(a.shortname),
  },
  {
    header: "Вес компании",
    cell: (value) => `${value.weight.toFixed(2)}%`,
    sortFunction: (a, b) => b.weight - a.weight,
  },
  {
    header: "Цена",
    cell: (value) =>
      Number.isInteger(value.price)
        ? `${value.price} ₽`
        : `${value.price.toFixed(2)}`,
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
    cell: (value) =>
      isNaN(value.stockBuyTarget) ? "0" : Math.round(value.stockBuyTarget), // при вводе денег будет NaN, эта проверка убирает
    sortFunction: (a, b) => b.stockBuyTarget - a.stockBuyTarget,
  },
  {
    header: "Итого за акции",
    cell: (value) =>
      isNaN(value.totalStockBuyTarget)
        ? "0"
        : Math.ceil(value.totalStockBuyTarget), // при вводе денег будет NaN, эта проверка убирает
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
  {
    header: "Убрать",
    cell: (value) => <RemoveCompany ticker={value.ticker} />,
  },
];
