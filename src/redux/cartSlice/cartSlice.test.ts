import reducer, {  removeCompanyFromCart } from './cartSlice'

describe('Тест cartSlice', () => {
	test('Редюсер должен вернуть начальное состояние', () => {
		const initialState = undefined;
		const action = { type: '' };
		const result = reducer(initialState, action);
		expect(result).toEqual([]);
	})
	test('addCompanyToCart, добавить тикер в корзину', () => {
		const initialState = ['AAAA'];
		const action = { type: 'cart/addCompanyToCart', payload: 'BBBB' };
		const result = reducer(initialState, action);
		expect(result).toEqual(['AAAA', 'BBBB'])
	})
	test('addCompanyToCart, корзина уже содержит тикер, добавляемый тикер добавляется в конец', () => {
		const initialState = ['AAAA', 'BBBB'];
		const action = { type: 'cart/addCompanyToCart', payload: 'CCCC' };
		const result = reducer(initialState, action);
		expect(result).toEqual(['AAAA', 'BBBB', 'CCCC']);
	})
	test('removeCompanyFromCart, убрать тикер из корзину', () => {
		const initialState = ['BBBB', 'AAAA'];
		const action = removeCompanyFromCart('AAAA')
		const result = reducer(initialState, action);
		expect(result).toEqual(['BBBB'])
	})
	test('removeCompanyFromCart, если тикера нет в корзине, то корзина остается в таком же виде', () => {
		const initialState = ['BBBB', 'AAAA'];
		const action = removeCompanyFromCart('FFFF')
		const result = reducer(initialState, action);
		expect(result).toEqual(['BBBB', 'AAAA'])
	})
})

