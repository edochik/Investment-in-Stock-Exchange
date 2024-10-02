import { configureStore } from '@reduxjs/toolkit'
import { initialDataSlice } from './initialDataSlice/initialDataSlice'
import { fetchInitialDataThunk } from './initialDataSlice/thunk';
import { userDataSlice } from './userDataSlice/userDataSlice';


const saveToLocalStorageMiddleware = (storeApi) => (next) => (action) => {
	const prevState = storeApi.getState();
	const result = next(action);
	const nextState = storeApi.getState();
	if (prevState !== nextState) {
		localStorage.setItem('data', JSON.stringify(nextState))
	}
	return result
}

// const dataMiddleware = saveToLocalStorageMiddleware()
export const store = configureStore({
	reducer: {
		data: initialDataSlice.reducer,
		userData: userDataSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveToLocalStorageMiddleware),
})

store.dispatch(fetchInitialDataThunk())

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



//Какая логика
//Должен сделать запрос и положить в локал сторадж +- проверить данные по дате
//Данные брать из локал стораджа
//При изменении данных класть в локал сторадж
//


// Проверить наличие данных в LocalStorage.
// Если данных нет — выполнить запрос и сохранить результат.
// Если данные есть — проверить, актуальны ли они по дате.
// Если данные неактуальны — выполнить новый запрос.
// Если данные актуальны — передать их в хранилище(store).

// при любом действии я обновляю данные в локал стораж ?