import { ImoexSecurity } from "../domain/ImoexSecurity";
import { fetchData, formatSecurityData } from "./helper";

const API_IMOEX = 'https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json?limit=100';

// почему мы не перехватываем здесь ошибку try{}catch()??
export async function fetchImoex() {
	const data = await fetchData<"analytics">(API_IMOEX)
	return formatSecurityData<ImoexSecurity>(data.analytics)
}
// 'https://iss.moex.com/iss/securities.json'
// 'https://iss.moex.com/iss/engines/stock/markets/shares/securities/AFLT.xml'