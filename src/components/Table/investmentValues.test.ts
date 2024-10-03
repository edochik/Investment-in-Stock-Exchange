import { InitialData } from "../../redux/initialDataSlice/initialDataSlice";
import { UserData } from "../../redux/userDataSlice/userDataSlice";
import { getInvestmentValues } from "./getInvestmentValues";

const initialData = {
	loading: "succeeded",
	imoex: [{
		ticker: 'AABB',
		shortnames: 'Какой то банк',
		weight: 0.50,
	}, {
		ticker: 'ZZBB',
		shortnames: 'Не такой банк',
		weight: 0.50,
	}],
	securities: {
		'AABB': {
			prevprice: 300,
			lotsize: 10
		},
		'ZZBB': {
			prevprice: 500,
			lotsize: 1
		}
	},
	error: null,
} as unknown as InitialData;

describe('Тестирование функции getInvestmentValues', () => {
	test('Функция создает объект с необходимыми полями', () => {
		const userData = {
			coefficients: {},
			stocks: {},
			moneyUser: 0,
		} as UserData
		const result = getInvestmentValues(userData, initialData);
		expect(result).toEqual([{
			price: 300,
			progressTarget: NaN,
			shortnames: "Какой то банк",
			stockBuyTarget: 0,
			stocksBuyUser: 0,
			ticker: "AABB",
			totalStockBuyTarget: 0,
			totalStocksBuyUser: 0,
			weight: 0.5,
			weightPortfolio: 50,
		}, {
			price: 500,
			progressTarget: NaN,
			shortnames: "Не такой банк",
			stockBuyTarget: 0,
			stocksBuyUser: 0,
			ticker: "ZZBB",
			totalStockBuyTarget: 0,
			totalStocksBuyUser: 0,
			weight: 0.5,
			weightPortfolio: 50,
		}])
	})
	test('Функция производит расчет с коэффициентом, акциями и деньгами пользователя', () => {
		const userData = {
			coefficients: { 'AABB': 2 },
			stocks: { 'ZZBB': 100 },
			moneyUser: 10000,
		} as UserData
		const result = getInvestmentValues(userData, initialData);
		expect(result).toEqual([{
			price: 300,
			progressTarget: 0,
			shortnames: "Какой то банк",
			stockBuyTarget: 20,
			stocksBuyUser: 0,
			ticker: "AABB",
			totalStockBuyTarget: 6000,
			totalStocksBuyUser: 0,
			weight: 1,
			weightPortfolio: 66.66666666666666,
		}, {
			ticker: "ZZBB",
			price: 500,
			progressTarget:  1428.5714285714287,
			shortnames: "Не такой банк",
			stockBuyTarget: -93,
			stocksBuyUser: 100,
			totalStockBuyTarget: -46500,
			totalStocksBuyUser: 50000,
			weight: 0.5,
			weightPortfolio: 33.33333333333333,
		}])
	})
})

