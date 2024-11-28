import reducer, { updateCoefficient, updateStocks, updateUserMoney, UserData } from './userDataSlice';

describe('Тестирование userDataSlice', () => {
	let previousState: UserData
	beforeEach(() => {
		previousState = {
			coefficients: {},
			moneyUser: 100000,
			stocks: {}
		}
	})
	test('reducer должен вернуть начальное состояние', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual(previousState)
	})
	test('updateCoefficient добавляет значение с тикером', () => {
		expect(reducer(previousState, updateCoefficient({ ticker: 'AAAA', count: 5 }))).toEqual({
			...previousState,
			coefficients: {
				"AAAA": 5
			},
		})
	})
	test('updateStocks добавляет значение с тикером', () => {
		expect(reducer(previousState, updateStocks({ ticker: 'AAAA', count: 5 }))).toEqual({
			...previousState,
			stocks: { "AAAA": 5 }
		})
	})
	test('updateUserMoney добавляет значение с тикером', () => {
		expect(reducer(previousState, updateUserMoney(1111))).toEqual({
			...previousState,
			moneyUser: 1111,
		})
	})
	test('updateCoefficient обновляет значение', () => {
		previousState.coefficients.AAAA = 5
		expect(reducer(previousState, updateCoefficient({ ticker: 'AAAA', count: 15 }))).toEqual({
			...previousState,
			coefficients: {
				"AAAA": 15
			},
		})
	})
	test('updateStocks обновляет значение', () => {
		previousState.stocks.AAAA = 5
		expect(reducer(previousState, updateStocks({ ticker: 'AAAA', count: 15 }))).toEqual({
			...previousState,
			stocks: { "AAAA": 15 }
		})
	})
	test('updateUserMoney обновляет значение', () => {
		previousState.moneyUser = 11111;
		expect(reducer(previousState, updateUserMoney(2000))).toEqual({
			...previousState,
			moneyUser: 2000,
		})
	})
})
