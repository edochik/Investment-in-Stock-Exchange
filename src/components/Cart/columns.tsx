interface Value {
  indexid: string;
  secids: string;
  shortnames: string;
  weight: number;
  price: number;
}

export interface Columns {
  header: string;
  cell: (value: Value) => React.ReactNode;
}
export const columns: Columns[] = [
  {
    header: "На какой бирже",
    cell: (value) => value.indexid,
  },
  {
    header: "Тикер",
    cell: (value) => value.secids,
  },
  {
    header: "Название",
    cell: (value) => value.shortnames,
  },
  {
    header: "Вес",
    cell: (value) => value.weight,
  },
  {
    header: "price",
    cell: (value) => value.price,
  },
  {
    header: "в таблицу",
    cell: (value) => <button>в таблицу</button>,
  },
];
