import { ImoexSecurity } from "../domain/ImoexSecurity";
import { fetchData, formatSecurityData } from "./helper";

const API_IMOEX = 'https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json?limit=100';


export async function fetchImoex() {
	const data = await fetchData<"analytics">(API_IMOEX);
	const result = formatSecurityData<ImoexSecurity>(data.analytics);
	return result.map(company => {
		const { ticker, shortnames, weight } = company;
		return {
			ticker,
			shortname: shortnames,
			weight
		}
	})
}

// 'https://iss.moex.com/iss/securities.json'
// 'https://iss.moex.com/iss/engines/stock/markets/shares/securities/AFLT.xml'

