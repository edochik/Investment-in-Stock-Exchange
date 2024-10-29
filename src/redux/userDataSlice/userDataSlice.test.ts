import reducer, { updateCoefficient, updateStocks, updateUserMoney } from './userDataSlice';

describe('Тестирование userDataSlice', () => {
	test('reducer должен вернуть начальное состояние', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual({
			coefficients: {},
			moneyUser: 0,
			stocks: {}
		})
	})
	test('Тестируем функцию updateCoefficient', () => {
		const previousState = {
			coefficients: {},
			moneyUser: 0,
			stocks: {}
		}
		expect(reducer(previousState, updateCoefficient({ ticker: 'AAAA', count: 5 }))).toEqual({
			...previousState,
			coefficients: {
				"AAAA": 5
			},
		})
	})
	test('Тестируем функцию updateStocks', () => {
		const previousState = {
			coefficients: {},
			moneyUser: 0,
			stocks: {}
		}
		expect(reducer(previousState, updateStocks({ ticker: 'AAAA', count: 5 }))).toEqual({
			...previousState,
			stocks: { "AAAA": 5 }
		})
	})
	test('Тестируем функцию updateUserMoney', () => {
		const previousState = {
			coefficients: {},
			moneyUser: 0,
			stocks: {}
		}
		expect(reducer(previousState, updateUserMoney(1111))).toEqual({
			...previousState,
			moneyUser: 1111,
		})
	})
	test('Тестируем функцию updateCoefficient, обновление значения', () => {
		const previousState = {
			coefficients: {
				AAAA: 5
			},
			moneyUser: 0,
			stocks: {}
		}
		expect(reducer(previousState, updateCoefficient({ ticker: 'AAAA', count: 15 }))).toEqual({
			...previousState,
			coefficients: {
				"AAAA": 15
			},
		})
	})
	test('Тестируем функцию updateStocks, обновление значения', () => {
		const previousState = {
			coefficients: {},
			moneyUser: 0,
			stocks: {
				AAAA: 5
			}
		}
		expect(reducer(previousState, updateStocks({ ticker: 'AAAA', count: 15 }))).toEqual({
			...previousState,
			stocks: { "AAAA": 15 }
		})
	})
	test('Тестируем функцию updateUserMoney, обновление значения', () => {
		const previousState = {
			coefficients: {},
			moneyUser: 1111,
			stocks: {}
		}
		expect(reducer(previousState, updateUserMoney(2000))).toEqual({
			...previousState,
			moneyUser: 2000,
		})
	})
})
