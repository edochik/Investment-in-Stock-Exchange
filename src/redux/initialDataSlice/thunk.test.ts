import { fetchInitialDataThunk } from "./thunk";
import * as moduleIsSameDay from './isSameDay';
import { localStorageMock } from "../../test/localStorageMock.js";


Object.defineProperty(window, "localStorage", { value: localStorageMock });

const setLocalStorage = (id: string, data: any) => {
	window.localStorage.setItem(id, JSON.stringify(data));
};

describe('Тест fetchInitialDataThunk', () => {
	it('Обработка ошибки данных нет в localStorage данные отсутствуют', async () => {
		global.fetch = jest.fn(() => { }) as jest.Mock; // подменяем fetch 
		const dispatch = jest.fn(); // делаем mock
		const thunk = fetchInitialDataThunk(); // передаем вызов в thunk
		await thunk(dispatch, () => { }, {}); // вызываем
		const { calls } = dispatch.mock;
		const [pending, fullfilled] = calls;
		expect(fullfilled[0].payload).toEqual(null);
	})
	it('Нет данных в localStorage, данные берутся из запроса', async () => {
		const fetchData = {
			analytics: {
				columns: ['ticker', 'shortnames', 'weight'],
				data: [['AAAA', 'Компания A', 50]]
			},
			securities: {
				columns: ["secid"],
				data: [['AAAA']]
			}
		}
		global.fetch = jest.fn(() => Promise.resolve({
			ok: true,
			json: () => fetchData
		})) as jest.Mock;
		const dispatch = jest.fn(); // делаем mock
		const thunk = fetchInitialDataThunk(); // передаем вызов в thunk
		await thunk(dispatch, () => { }, {}); // вызываем
		const { calls } = dispatch.mock;
		const [_, fullfilled] = calls;
		const { imoex, securities } = fullfilled[0].payload;
		expect(imoex).toStrictEqual([{ ticker: 'AAAA', shortname: 'Компания A', weight: 50 }]);
		expect(securities).toStrictEqual([{ secid: 'AAAA' }]);
		jest.restoreAllMocks();
	})
	it('Данные в localStorage есть, данные обновлены, свежая дата', async () => {
		const imoexData = {
			imoex: [{ ticker: 'A' }],
			securities: {
				A: {
					secid: "A"
				},
			},
			isFresh: true
		}
		setLocalStorage('imoexData', imoexData) // положил данные в localStorage
		jest.spyOn(moduleIsSameDay, 'isSameDay').mockReturnValue(false)
		const dispatch = jest.fn(); // делаю mock dispatch
		const thunk = fetchInitialDataThunk();
		await thunk(dispatch, () => { }, {});
		global.fetch = jest.fn(() => { }) as jest.Mock;
		const { calls } = dispatch.mock;
		const [_, fullfilled] = calls;
		expect(fullfilled[0].payload).toStrictEqual(imoexData);
		jest.restoreAllMocks();
		window.localStorage.clear();
	});
	it('Данные в localStorage есть, данные не обновлены, дата не свежая', async () => {
		const imoexData = {
			imoex: [{ ticker: 'A' }],
			securities: {
				A: {
					secid: "A"
				},
			},
			isFresh: false
		}
		setLocalStorage('imoexData', imoexData);
		jest.spyOn(moduleIsSameDay, 'isSameDay').mockReturnValue(true)
		const dispatch = jest.fn();
		const thunk = fetchInitialDataThunk();
		await thunk(dispatch, () => { }, {});
		global.fetch = jest.fn(() => { }) as jest.Mock;
		const { calls } = dispatch.mock;
		const [_, fullfilled] = calls;
		expect(fullfilled[0].payload).toStrictEqual(imoexData);
		jest.restoreAllMocks();
		window.localStorage.clear();
	});
})