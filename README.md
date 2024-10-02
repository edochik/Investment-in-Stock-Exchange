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

- input отдельный slice = данные пользователя коэфицент, и кол-во акций объкт, объект c коэфицентами
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

- пулучаем данные с запроса, данные преобразовываем, и потом данные считаем в useSelect()
  т.е все расчеты и данные можно получить когда достаем state а дальше его state разбиваем.

//reselect кэширование selector

// у Input локальный state
// в Input можно строку ввести а число в redux
// иницилизируем данными из стора
// в инпут валидация только цифры и точки


//================================================================================
сначала считаю всю сумму денег по всем акциям, с округлением вверх или вниз

```js
let allSumStock = imoex.reduce((acc, dataCompany) => {
  const { ticker } = dataCompany;
  let { weight } = dataCompany;
  const price = securities[ticker].prevprice;
  const lotsize = securities[ticker].lotsize;
  const coefficient = coefficients[ticker] ?? 1;
  const weightPortfolio = coefficient * weight * weightCompanies * 100;
  const stocksBuyTarget = Math.round(
    (moneyUser * weightPortfolio) / (price * 100)
  );
  const stocksBuyLotsize = Math.round(stocksBuyTarget / lotsize) * lotsize;
  const totalSum = stocksBuyLotsize * price;
  return acc + totalSum;
}, 0);
```

Потом проверяю можно ли окрулить лот вверх, т.е не будет ли лот при округлении в верх превышать сумму пользователя если не будет округляю, если будет то округляю в низ, так же вычитаю это из суммы посчитанной ранее

```js
const prevTotalSum = Math.round(stocksBuyTarget / lotsize) * lotsize * price;
const isMoreAllSumStock = allSumStock + lotsize * price < moneyUser;
console.log(allSumStock + lotsize * price, moneyUser);
let stocksBuyLotsize = isMoreAllSumStock
  ? Math.ceil(stocksBuyTarget / lotsize) * lotsize
  : Math.floor(stocksBuyTarget / lotsize) * lotsize;
allSumStock += stocksBuyLotsize * price;
allSumStock -= prevTotalSum;
```

// единица нарисованаая в коэффициенте, если данные загрузил из LocalStorage
откуда я её возьму нет интернета.

// кэширование данных в локал стораж, по дате.
цель купленный + коэфицент, + кэширование подате двух запросов

// сортировка, Тикер, вес, весу портфеля, сумме купленных и сумме купленных.
// не сортировать по цене акции/коэффиценту;

// добавлять новую компанию в строку

