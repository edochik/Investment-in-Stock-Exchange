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


// ===============================Первый способ================================
// использование того же fetchInitialDataThunk
// делаем получаем данные и повторно их преобразовываем
export const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchInitialDataThunk.fulfilled, (state, action) => {
			const { imoex, securities } = action.payload
			const transform = Object.fromEntries(securities.map(s => [s.secid, s]))
			return imoex.map((company) => {
				const { ticker, shortnames, weight } = company;
				const price = transform[ticker].prevprice;
				return { ticker, shortnames, weight, price };
			})
		})
	}
})

// ===============================Второй способ================================
// делаем вторую санку
export const fetchGetDataThunk = createAsyncThunk(
	'fetchGetData',
	async (_, { getState }) => {
		const state = getState() as RootState;;
		const { imoex, securities } = state.data;
		return { imoex, securities }
	}
)

export const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchGetDataThunk.fulfilled, (state, action) => {
			const { imoex, securities } = action.payload;
			return imoex.map((company: any) => {
				const { ticker, shortnames, weight } = company;
				const price = securities[ticker].prevprice;
				return { ticker, shortnames, weight, price };
			});
		})
	}
})

store.dispatch(fetchInitialDataThunk()).then(() => {
	store.dispatch(fetchGetDataThunk())
})