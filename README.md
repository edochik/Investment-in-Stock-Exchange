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

```js
const securityData = {
  secid: "SBERP",
	boardid: "TQBR",
	shortname: "Сбербанк-п",
	prevprice: 265.84,
	lotsize: 10,
	facevalue: 3,
	status: "A",
	boardname: "Т+: Акции и ДР - безадрес.",
	decimals: 2,
	secname: "Сбербанк России ПАО ап",
	remarks: null,
	marketcode: "FNDT",
	instrid: "EQIN",
	sectorid: null,
	minstep: 0.01,
	prevwaprice: 264.07,
	faceunit: "SUR",
	prevdate: "2024-09-17",
	issuesize: 1000000000,
	isin: "RU0009029557",
	latname: "Sberbank (pref)",
	regnumber: "20301481B",
	prevlegalcloseprice: 266,
	currencyid: "SUR",
	sectype: "2",
	listlevel: 1,
	settledate: "2024-09-19"
};

```



Вопросы типизиация useSelector и useDispatch?? => hooks
Куда мы складываем все interface