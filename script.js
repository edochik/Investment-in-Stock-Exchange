const API_IMOEX = 'https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json?limit=100';
const API_SECURITIES = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json';


async function getApi(...apis) {
	try {
		const responses = await Promise.all(apis.map(api => fetch(api)))
		responses.forEach(response => {
			if (!response.ok) {
				throw new Error(`${response.message}`)
			}
		})
		const result = await Promise.all(responses.map((response) => response.json()))
		return {
			imoex: formatImoex(result[0]),
			securities: formatSecurities(result[1])
		}
	} catch (error) {
		throw new Error(error.message)
	}
}
// async function getApi(api1, api2) {
// 	try {
// 		return Promise.all([fetch(api1), fetch(api2)])
// 			.then(async ([first, second]) => {
// 				const imoex = await first.json();
// 				const securities = await second.json();
// 				console.log(formatSecurities(securities));
// 				return {
// 					imoex: formatImoex(imoex),
// 					securities: formatSecurities(securities)
// 				}
// 			})
// 			.catch(error => console.log(error))
// 	} catch (error) {
// 		throw new Error(error.message)
// 	}
// }

console.log(getApi(API_IMOEX, API_SECURITIES));


function formatImoex(data) {
	const keys = data.analytics.columns
	const companies = data.analytics.data;
	return companies.map((company) => {
		const array = company.map((elem, index) => [keys[index].toLowerCase(), elem])
		return Object.fromEntries(array)
	})
}

//formatImoex
//formatSecurities

function formatSecurities(data) {
	const keys = data.securities.columns
	const companies = data.securities.data;
	const result = Object.create(null);
	companies.forEach((company) => {
		const array = company.map((elem, index) => [keys[index].toLowerCase(), elem])
		const object = Object.fromEntries(array)
		const key = company[0]
		result[key] = object
	})
	// console.log(companies);
	return result
}
