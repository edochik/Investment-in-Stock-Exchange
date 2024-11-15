import { isSameDay } from "./isSameDay";

describe('Тест функции isSameDay', () => {
	test('Новая дата больше предыдущей', () => {
		const newDate = new Date('2024.01.21');
		const prevDate = new Date('2024.01.20');
		const result = isSameDay(newDate, prevDate);
		expect(result).toBe(true)
	});
	test('Новая дата такая же как предыдущая', () => {
		const newDate = new Date('2024.01.21');
		const prevDate = new Date('2024.01.21');
		const result = isSameDay(newDate, prevDate);
		expect(result).toBe(false)
	});
})