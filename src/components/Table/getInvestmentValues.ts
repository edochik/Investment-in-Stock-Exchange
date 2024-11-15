import { Security } from "../../domain/Security";
import { ClientSecurity } from "../../domain/ClientSecurity.js";
import { UserData } from "../../redux/userDataSlice/userDataSlice";
import { Value } from "./columns";
export interface SecuritiesData {
	moex: ClientSecurity[],
	securities: Record<string, Security>
}

export function getInvestmentValues(
	userData: UserData,
	securitiesData: SecuritiesData,
	cart: string[],
): Value[] {
	const { coefficients, stocks, moneyUser } = userData;
	const { moex, securities } = securitiesData;

	const tickersInCart = new Set(cart);
	const filterCompanies = moex.filter(({ ticker }) => !tickersInCart.has(ticker));

	const weightCompanies = 1 / filterCompanies.reduce((acc, company) => {
		const coeff = coefficients[company.ticker] ?? 1;
		return acc + coeff * company.weight;
	}, 0);

	return filterCompanies.map((dataCompany) => {
		const { ticker, shortname } = dataCompany;
		let { weight } = dataCompany
		const price = securities[ticker].prevprice; 
		const lotsize = securities[ticker].lotsize; 
		const stocksBuyUser = stocks[ticker] ?? 0; 
		const totalStocksBuyUser = stocksBuyUser * price;
		const coefficient = coefficients[ticker] ?? 1; 
		const newWeight = weight * coefficient;
		const weightPortfolio = newWeight * weightCompanies * 100; 
		const stockBuy = Math.round((moneyUser * weightPortfolio) / (price * 100)); 
		const aroundStockLotsize = Math.round(stockBuy / lotsize) * lotsize; 
		const stockBuyTarget = stocks[ticker] ? aroundStockLotsize - stocks[ticker] : aroundStockLotsize
		const totalStockBuyTarget = stockBuyTarget * price; 
		const progressTarget = stocksBuyUser * 100 / aroundStockLotsize;
		return {
			ticker,
			shortname,
			weight: newWeight,
			price,
			stocksBuyUser,
			totalStocksBuyUser,
			weightPortfolio,
			stockBuyTarget,
			totalStockBuyTarget,
			progressTarget,
		};
	});
}