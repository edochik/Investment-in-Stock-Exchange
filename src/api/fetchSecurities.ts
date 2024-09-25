import { Security } from "../domain/Security";
import { fetchData, formatSecurityData } from "./helper";

const API_SECURITIES = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json'

// почему мы не перехватываем здесь ошибку try{}catch()??
export async function fetchSecurities() {
	const data = await fetchData<"securities">(API_SECURITIES)
	return formatSecurityData<Security>(data.securities)
}
