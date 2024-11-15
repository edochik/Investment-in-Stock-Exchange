import { fetchData } from "./helper";

describe('Тест функции fetchData', () => {
	it('Получаем необходимые значения', async () => {
		global.fetch = jest.fn(() => Promise.resolve({
			ok: true,
			json: () => 'Test'
		})) as jest.Mock;
		const result = await fetchData('')
		expect(result).toBe('Test');
		jest.restoreAllMocks();
	})
	it('Обработка ошибки', async () => {
		global.fetch = jest.fn(() => Promise.resolve({
			ok: false,
			json: () => 'Test',
			status: 404
		})) as jest.Mock;
		await expect(fetchData('invalid-url')).rejects.toThrow(Error); 
		await expect(fetchData('invalid-url')).rejects.toThrow('404');
		jest.restoreAllMocks();
	})
})

