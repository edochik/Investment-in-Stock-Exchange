import { formatPrice } from "./formatPrice"

test('Тест formatPrice', () => {
	const result = formatPrice(100000);
	expect(result).toBe('100 000');
})