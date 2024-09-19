import { configureStore } from '@reduxjs/toolkit'
import moexSlicer, { fetchDataMoex }  from './slicer/moexSlicer'
// import imoexSlicer, { fetchDataImoex } from './slicer/imoexSlicer'
// import securitiesSlicer, { fetchDataSecurities } from './slicer/securitiesSlicer'

export const store = configureStore({
	reducer: {
		moex: moexSlicer 
	},
})

store.dispatch(fetchDataMoex())
// store.dispatch(fetchDataImoex())
// store.dispatch(fetchDataSecurities())

export type RootState = ReturnType<typeof store.getState>
// Это определяет тип всего состояния вашего Redux-хранилища. TypeScript автоматически выводит тип, который возвращает функция getState() вашего store. Это нужно, чтобы типизировать state при использовании useSelector.
export type AppDispatch = typeof store.dispatch
// Определяет тип для dispatch, чтобы TypeScript знал, какие экшены можно отправлять в вашем приложении. Это полезно для типизации dispatch при использовании useDispatch, особенно когда вы работаете с асинхронными экшенами (например, thunks).