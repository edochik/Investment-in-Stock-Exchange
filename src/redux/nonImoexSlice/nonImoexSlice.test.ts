
import reducer, { selectedNonImoex } from './nonImoexSlice'

describe('Тест слайса nonImoexSlice', () => {
	test('selectedNonImoex добавляет компанию в слайс', () => {
		const initialState = [{ ticker: 'AAAA', shortname: 'Компания А', weight: 50 }]
		const action = selectedNonImoex({ ticker: 'BBBB', shortname: 'Компания B', weight: 50 })
		const result = reducer(initialState, action);
		expect(result).toStrictEqual([
			{
				shortname: "Компания А",
				ticker: "AAAA",
				weight: 50
			}, {
				shortname: "Компания B",
				ticker: "BBBB",
				weight: 50,
			}
		])
	})
});