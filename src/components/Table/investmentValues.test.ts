import { UserData } from "../../redux/userDataSlice/userDataSlice";
import { getInvestmentValues, SecuritiesData } from "./getInvestmentValues";

const securitiesData = {
	moex: [{
		ticker: 'AABB',
		shortname: 'Какой то банк',
		weight: 0.50,
	}, {
		ticker: 'ZZBB',
		shortname: 'Не такой банк',
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
} as unknown as SecuritiesData;

describe('Тестирование функции getInvestmentValues', () => {
	test('Функция создает объект с необходимыми полями', () => {
		const userData = {
			coefficients: {},
			stocks: {},
			moneyUser: 0,
		} as UserData
		const cart: string[] = []
		const result = getInvestmentValues(userData, securitiesData, cart);
		console.log(result);
		expect(result).toEqual([{
			price: 300,
			progressTarget: NaN,
			shortname: "Какой то банк",
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
			shortname: "Не такой банк",
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
			stocks: { 'ZZBB': 7 },
			moneyUser: 10000,
		} as UserData
		const cart: string[] = []
		const result = getInvestmentValues(userData, securitiesData, cart);
		expect(result).toEqual([{
			price: 300,
			progressTarget: 0,
			shortname: "Какой то банк",
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
			progressTarget: 100,
			shortname: "Не такой банк",
			stockBuyTarget: 0,
			stocksBuyUser: 7,
			totalStockBuyTarget: 0,
			totalStocksBuyUser: 3500,
			weight: 0.5,
			weightPortfolio: 33.33333333333333,
		}])
	})
	test('Функция производит расчет и производит фильтрацию по корзине', () => {
		const userData = {
			coefficients: { 'AABB': 2 },
			stocks: { 'ZZBB': 7 },
			moneyUser: 10000,
		} as UserData
		const cart: string[] = ['ZZBB']
		const result = getInvestmentValues(userData, securitiesData, cart);
		expect(result).toEqual([{
			price: 300,
			progressTarget: 0,
			shortname: "Какой то банк",
			stockBuyTarget: 30,
			stocksBuyUser: 0,
			ticker: "AABB",
			totalStockBuyTarget: 9000,
			totalStocksBuyUser: 0,
			weight: 1,
			weightPortfolio: 100,
		}])
	})
})

