import { localStorageMock } from "../test/localStorageMock";
import { extractLocalStorageOnKey } from "./extractLocalStorageOnKey";

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const setLocalStorage = (id: string, data: any) => {
	window.localStorage.setItem(id, JSON.stringify(data));
};

describe('Тест extractLocalStorageOnKey', () => {
	it('Возвращает значение из localStorage', () => {
		setLocalStorage('testKey', 'string')
		expect(extractLocalStorageOnKey('testKey', 1)).toBe('string');
		window.localStorage.clear();
	});
	it('Возвращает второй аргумент, если нет данных в localStorage', () => {
		expect(extractLocalStorageOnKey('testKey', 'return')).toBe('return');
		window.localStorage.clear();
	});
	it('test', () => {
		const getErrorLocalStorage = (id: string, data: any) => {
			window.localStorage.setItem(id, data);
		};
		getErrorLocalStorage('testKey', '{"foo": 1.}');
		expect(extractLocalStorageOnKey('testKey', 'default value')).toBe('default value');
	});
})