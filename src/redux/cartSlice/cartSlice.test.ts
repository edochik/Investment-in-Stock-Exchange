import reducer, { addCompanyToCart, removeCompanyFromCart } from './cartSlice'

describe('Тестирование cartSlice', () => {
	test('Редюсер должен вернуть начальное состояние', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual([])
	})
	test('Тестирование функции addCompanyToCart, добавить тикер в корзину', () => {
		const previousState: string[] = [];
		expect(reducer(previousState, addCompanyToCart('AAAA'))).toEqual(['AAAA'])
	})
	test('Тестирование функции addCompanyToCart, корзина уже содержит тикер, добавляемый тикер добавляется в конец', () => {
		const previousState: string[] = ['AAAA', 'BBBB'];
		expect(reducer(previousState, addCompanyToCart('CCCC'))).toEqual(['AAAA', 'BBBB', 'CCCC'])
	})
	test('Тестирование функции removeCompanyFromCart, убрать тикер из корзину', () => {
		const previousState: string[] = ['BBBB', 'AAAA'];
		expect(reducer(previousState, removeCompanyFromCart('AAAA'))).toEqual(['BBBB'])
	})
	test('Тестирование функции removeCompanyFromCart, если тикера нет в корзине, то корзина остается в таком же виде', () => {
		const previousState: string[] = ['BBBB', 'AAAA'];
		expect(reducer(previousState, removeCompanyFromCart('FFFF'))).toEqual(['BBBB', 'AAAA'])
	})
})

