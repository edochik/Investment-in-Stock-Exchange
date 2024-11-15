import { formatPrice } from "./formatPrice"

test('Тест функции formatPrice, форматирует значение корректно', () => {
	const result = formatPrice(100000);
	expect(result).toBe('100 000');
})