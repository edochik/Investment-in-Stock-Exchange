import { CoefficientInput } from "../CoefficientInput/CoefficientInput";
import { StockNumberInput } from "../StockNumberInput/StockNumberInput";
export interface Value {
  ticker: string;
  shortnames: string;
  weight: number;
  price: number;
  stocksBuyUser: number;
  weightPortfolio: number;
  stocksBuyLotsize: number;
  totalSum: number;
  progressToTarget: number;
}

interface Columns {
  header: string;
  cell: (value: Value) => React.ReactNode;
}

export const columns: Columns[] = [
  {
    header: "Тикер",
    cell: (value) => (
      <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
        <img
          src={`/images/${value.ticker}.png`}
          style={{ width: 20, height: 20 }}
          alt={`Логотип ${value.ticker}`}
        />
        {value.ticker}
      </div>
    ),
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
    cell: (value) => {
      return Math.round(value.stocksBuyLotsize);
    },
  },
  {
    header: "Итого за акции",
    cell: (value) => {
      return `${Math.round(value.totalSum)} ₽`;
    },
  },
  {
    header: "Цель достигнута в %",
    cell: (value) => {
      return isNaN(value.progressToTarget)
        ? ""
        : Math.round(value.progressToTarget);
    },
  },
];
