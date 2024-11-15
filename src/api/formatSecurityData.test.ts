import { formatSecurityData } from "./formatSecurityData";

test('Тест функции formatSecurityData', () => {
	const data = {
		columns: ['ticker'],
		data: [['A'], ['B']]
	}
	const result = formatSecurityData(data);
	expect(result).toStrictEqual([{ ticker: 'A' }, { ticker: 'B' }])
})




