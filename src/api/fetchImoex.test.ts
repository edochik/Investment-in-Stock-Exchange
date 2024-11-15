import { fetchImoex } from "./fetchImoex";

test('Тест функции fetchImoex', async () => {
	const data = {
		analytics: {
			columns: ['ticker', 'shortnames', 'weight', 'test'],
			data: [['A', 'Компания A', 100, 'test']]
		}
	}
	global.fetch = jest.fn(() => Promise.resolve({
		ok: true,
		json: () => {
			return data
		}
	})) as jest.Mock;
	expect(await fetchImoex()).toStrictEqual([{ ticker: 'A', shortname: 'Компания A', weight: 100 }]);
})
