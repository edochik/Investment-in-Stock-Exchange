import { formatSecurityData } from "./formatSecurityData";

test('Тестирование formatSecurityData', () => {
	const data = {
		columns: ['ticker'],
		data: [['A'], ['B']]
	}
	const result = formatSecurityData(data);
	expect(result).toStrictEqual([{ ticker: 'A' }, { ticker: 'B' }])
})




