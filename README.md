1. делаем запросы Api

- https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json = IMOEX
- https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json = securities

2. преобразовываем функцией - две массива

пример:

```js
const data =[{
	indexid":	"IMOEX",
"tradedate":"2024-09-13",
"ticker":"AFKS",
"shortnames":"Система ао",
"secids":"AFKS",
"weight":0.62,
"tradingsession":3
}]
```

хронить в store 3. массив, основной массив 1, второй массив дополняет данными, только те которые есть в таблице от "экономиста"

4. Попробовать вывести данные в данные в таблицу пример был как по

Вопросы типизиация useSelector и useDispatch?? => hooks
Куда мы складываем все interface ??? по обстоятельствам хз короче

Структура проекта:
src/
├── api/
│ ├─── fetchImoex.ts //делаем запрос к ценным бумагам Imoex
│ ├─── fetchSecurities.ts // делаем запрос к остальным ценным бумагам Securities
│ └─── helper.ts // вспомогательная функция для запроса Fetch, а так же преобразование формата
├── app/
│ └─── App.ts // основной компонент приложения
├── components/
│ └─── Table // компонент таблица
├── domain/
│ ├─── ImoexSecurity.ts // interface Imoex
│ └─── security.ts // interface security
├── redux/ // хранилище store
├── style/ // стили
├── utils/ // остальные вспомогательные функции
├── Globals.d.ts // глобальный файл для того, чтобы работали модули scss
├── hooks.ts // кастомные хуки для Typescript
└── index.ts // основной файл

в redux один slice одна папка. в папке с этим slice создаем thunk что то еще
разделение логики преобразование данных и самой санки

реализация верстки и расчетов => две сущность массив и объект надо собрать данные которые только нужны
+ input отдельный slice = данные пользователя коэфицент, и кол-во акций объкт, объект c коэфицентами
внесение дополнительных 
1. делаем запросы Api

- https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json = IMOEX
- https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json = securities

2. преобразовываем функцией - две массива

пример:

```js
const data = [
  {
    indexid: "IMOEX",
    tradedate: "2024-09-13",
    ticker: "AFKS",
    shortnames: "Система ао",
    secids: "AFKS",
    weight: 0.62,
    tradingsession: 3,
  },
];
```

хронить в store 3. массив, основной массив 1, второй массив дополняет данными, только те которые есть в таблице от "экономиста"

4. Попробовать вывести данные в данные в таблицу пример был как по

Вопросы типизиация useSelector и useDispatch?? => hooks
Куда мы складываем все interface ??? по обстоятельствам хз короче

Структура проекта:
src/
├── api/
│ ├─── fetchImoex.ts //делаем запрос к ценным бумагам Imoex
│ ├─── fetchSecurities.ts // делаем запрос к остальным ценным бумагам Securities
│ └─── helper.ts // вспомогательная функция для запроса Fetch, а так же преобразование формата
├── app/
│ └─── App.ts // основной компонент приложения
├── components/
│ └─── Table // компонент таблица
├── domain/
│ ├─── ImoexSecurity.ts // interface Imoex
│ └─── security.ts // interface security
├── redux/ // хранилище store
├── style/ // стили
├── utils/ // остальные вспомогательные функции
├── Globals.d.ts // глобальный файл для того, чтобы работали модули scss
├── hooks.ts // кастомные хуки для Typescript
└── index.ts // основной файл

в redux один slice одна папка. в папке с этим slice создаем thunk что то еще
разделение логики преобразование данных и самой санки

реализация верстки и расчетов => две сущность массив и объект надо собрать данные которые только нужны

- input отдельный slice = данные пользователя коэфицент, и кол-во акций объкт, объект c коэфицентами
  внесение дополнительных



//=================================================================================
import { createSlice } from "@reduxjs/toolkit";

type InitialState = Record<string, number>
const initialState: InitialState = {}

export const coefficientUserSlice = createSlice({
	name: 'stocksUser',
	initialState,
	reducers: {
		addCoefficient: (state, action) => {
			Object.assign(state, action.payload)
		}
	},
})

export const { addCoefficient } = coefficientUserSlice.actions
//=================================================================================
import { createSlice } from "@reduxjs/toolkit";

type InitialState = Record<string, number>
const initialState: InitialState = {}

export const stocksUserSlice = createSlice({
	name: 'stocksUser',
	initialState,
	reducers: {
		addStocks: (state, action) => {
			Object.assign(state, action.payload)
		}
	},
})

export const { addStocks } = stocksUserSlice.actions
//=================================================================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id;
    const value = e.target.value;
    if (e.target.name === "stocks") {
      dispatch(addStocks({ [key]: Number(value) }));
    }
    if (e.target.name === "coefficient") {
      dispatch(addCoefficient({ [key]: Number(value) }));
    }
  };

//==============================================================================
import { ImoexSecurity } from "../../domain/ImoexSecurity";
import { Security } from "../../domain/securitiy";
import s from "./Table.module.scss";
type Column = ImoexSecurity & Security;

interface Header<T> {
  header: string;
  cell: (
    arg1: T,
    fn?: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => string | number | JSX.Element;
}

export const columns: Header<Column>[] = [
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
    cell: (column: Column) => column.prevprice,
  },
  {
    header: "Куплено акций",
    cell: (column: Column, fn) => (
      <input
        className={s.input}
        type="text"
        name="stocks"
        id={column.ticker}
        onChange={fn}
      />
    ),
  },
  {
    header: "Коэф-т",
    cell: (column: Column, fn) => (
      <input
        className={s.input}
        type="text"
        name="coefficient"
        id={column.ticker}
        onChange={fn}
      />
    ),
  },
  {
    header: "Сумма акций",
    cell: (column: Column) => column.prevprice,
  },
];

//==============================================================================

  const table = imoex
    .map((item) => Object.assign({}, item, securities[item.secids]))
    .slice(0, 15);

//==============================================================================

 <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            <th className={s.th}>№</th>
            {columns.map((column, index) => (
              <th key={index} className={s.th}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {table.map((row, index) => (
            <tr className={s.tr} key={index}>
              <td className={s.td}>{index + 1}</td>
              {columns.map((column, index) => (
                <td key={index} className={s.td}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>