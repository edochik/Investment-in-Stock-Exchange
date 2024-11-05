import { fetchData } from "./helper";

describe('Тестирование', () => {
	it('Данные без отклонения', async () => {
		global.fetch = jest.fn(() => Promise.resolve({
			ok: true,
			json: () => 'Test'
		})) as jest.Mock;
		const result = await fetchData('')
		expect(result).toBe('Test');
		jest.restoreAllMocks();
	})
	it('Данные с отклонениями', async () => {
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

