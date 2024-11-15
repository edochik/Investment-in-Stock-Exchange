import { Columns, Value } from "./columns";
import { sortInvestmentValues } from "./sortInvestmentValues";
interface List {
	ticker: string
}
const list = [
	{ ticker: 'ABBB' },
	{ ticker: 'AAAB' },
	{ ticker: 'BBAA' },
	{ ticker: 'ABAB' }
] as unknown as Value[]

const sortFunction = (a: List, b: List) => b.ticker.localeCompare(a.ticker);

describe('Тест функции sortInvestmentValues', () => {
	test('функция не сортирует данные', () => {
		const result = sortInvestmentValues({ column: null, direction: 'desc' }, list);
		expect(result).toEqual([
			{ ticker: 'ABBB' },
			{ ticker: 'AAAB' },
			{ ticker: 'BBAA' },
			{ ticker: 'ABAB' }
		])
	})
	test('функция сортирует от Я => А', () => {
		const column = {
			sortFunction
		} as unknown as Columns
		const result = sortInvestmentValues({ column, direction: 'desc' }, list);
		expect(result).toEqual([
			{ ticker: 'BBAA' },
			{ ticker: 'ABBB' },
			{ ticker: 'ABAB' },
			{ ticker: 'AAAB' }
		])
	})
	test('функция сортирует от А => Я', () => {
		const column = {
			sortFunction
		} as unknown as Columns
		const result = sortInvestmentValues({ column, direction: 'asc' }, list);
		expect(result).toEqual([
			{ ticker: 'AAAB' },
			{ ticker: 'ABAB' },
			{ ticker: 'ABBB' },
			{ ticker: 'BBAA' },
		])
	})
})