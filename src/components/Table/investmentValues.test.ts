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
		},
		'ZZBB': {
			prevprice: 500,
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
			ticker: 'AABB',
			shortnames: 'Какой то банк',
			weight: 0.50,
			price: 300,
			buyStocksUser: 0, //
			weightPortfolio: 50,
			targetStocksToBuy: 0,
			totalStocks: 0,
			progressToTarget: 0,
		}, {
			ticker: 'ZZBB',
			shortnames: 'Не такой банк',
			weight: 0.50,
			price: 500,
			buyStocksUser: 0, //
			weightPortfolio: 50,
			targetStocksToBuy: 0,
			totalStocks: 0,
			progressToTarget: 0,
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
			ticker: 'AABB',
			shortnames: 'Какой то банк',
			weight: 0.50,
			price: 300,
			buyStocksUser: 0, //
			weightPortfolio: 66.66666666666666,
			targetStocksToBuy: 22.22222222222222,
			progressToTarget: 0,
			totalStocks: 6666.666666666666,
		}, {
			ticker: 'ZZBB',
			shortnames: 'Не такой банк',
			weight: 0.50,
			price: 500,
			buyStocksUser: 100,
			weightPortfolio: 33.33333333333333,
			targetStocksToBuy: 6.666666666666666,
			progressToTarget: 1500.0000000000002,
			totalStocks: 3333.333333333333,
		}])
	})
})

