import reducer, { updateCoefficient, updateStocks, updateUserMoney, UserData } from './userDataSlice';

describe('Тестирование userDataSlice', () => {
	let previousState: UserData
	beforeEach(() => {
		previousState = {
			coefficients: {},
			moneyUser: 0,
			stocks: {}
		}
	})
	test('reducer должен вернуть начальное состояние', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual(previousState)
	})
	test('Тестируем функцию updateCoefficient', () => {
		expect(reducer(previousState, updateCoefficient({ ticker: 'AAAA', count: 5 }))).toEqual({
			...previousState,
			coefficients: {
				"AAAA": 5
			},
		})
	})
	test('Тестируем функцию updateStocks', () => {
		expect(reducer(previousState, updateStocks({ ticker: 'AAAA', count: 5 }))).toEqual({
			...previousState,
			stocks: { "AAAA": 5 }
		})
	})
	test('Тестируем функцию updateUserMoney', () => {
		expect(reducer(previousState, updateUserMoney(1111))).toEqual({
			...previousState,
			moneyUser: 1111,
		})
	})
	test('Тестируем функцию updateCoefficient, обновление значения', () => {
		previousState.coefficients.AAAA = 5
		expect(reducer(previousState, updateCoefficient({ ticker: 'AAAA', count: 15 }))).toEqual({
			...previousState,
			coefficients: {
				"AAAA": 15
			},
		})
	})
	test('Тестируем функцию updateStocks, обновление значения', () => {
		previousState.stocks.AAAA = 5
		expect(reducer(previousState, updateStocks({ ticker: 'AAAA', count: 15 }))).toEqual({
			...previousState,
			stocks: { "AAAA": 15 }
		})
	})
	test('Тестируем функцию updateUserMoney, обновление значения', () => {
		previousState.moneyUser = 11111;
		expect(reducer(previousState, updateUserMoney(2000))).toEqual({
			...previousState,
			moneyUser: 2000,
		})
	})
})
