export interface ImoexSecurity {
	indexid: string,
	tradedate: string,
	ticker: string,
	shortnames: string,
	secids: number,
	weight: number,
	tradingsession: number,
}

type OmitImoexSecurity = Omit<ImoexSecurity, 'tradingsession' | 'weight' | 'secids'>
type PickmoexSecurity = Pick<ImoexSecurity, 'indexid'>
// const test: OmitImoexSecurity = {
// 	indexid: 'string',
// 	tradedate: 'string',
// 	ticker: 'string',
// 	shortnames: 'string',
// 	secids: 300,
// 	// weight: 300,
// 	// tradingsession: 300,
// }

const test2: OmitImoexSecurity[] = [{
	indexid: 'string',
	tradedate: 'string',
	ticker: 'string',
	shortnames: 'string',
	// secids: 300
}, {
	indexid: 'string',
	tradedate: 'string',
	ticker: 'string',
	shortnames: 'string',
	// secids: 450
}]

const test3: PickmoexSecurity[] = [{
	indexid: 'string',
	// tradedate: 'string',
	// ticker: 'string',
	// shortnames: 'string',
	// secids: 300
}, {
	indexid: 'string',
	// tradedate: 'string',
	// ticker: 'string',
	// shortnames: 'string',
	// secids: 450
}]