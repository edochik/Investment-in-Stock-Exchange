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

	//* вывод в таблицу
	//? дополнительные данные для расчета (без вывода)
	return filterCompanies.map((dataCompany) => {
		const { ticker, shortname } = dataCompany; //* ticker и shornames Api
		let { weight } = dataCompany //* вес компании Api
		const price = securities[ticker].prevprice; //* цена за акцию Api
		const lotsize = securities[ticker].lotsize; //? лотность  Api
		const stocksBuyUser = stocks[ticker] ?? 0; //? купленно акций
		const totalStocksBuyUser = stocksBuyUser * price //* сумма купленных акций
		const coefficient = coefficients[ticker] ?? 1; //* коэффициент
		const newWeight = weight * coefficient //* вес с учетом коэффициента 
		const weightPortfolio = newWeight * weightCompanies * 100; //* вес акций в портфеле
		const stockBuy = Math.round((moneyUser * weightPortfolio) / (price * 100)); //? купить акций по формуле
		//Math.round - нужен чтобы правильно округлить акции и посчитать процент
		const aroundStockLotsize = Math.round(stockBuy / lotsize) * lotsize; //? округление акций по лотности
		const stockBuyTarget = stocks[ticker] ? aroundStockLotsize - stocks[ticker] : aroundStockLotsize
		//*Купить акций (шт)
		const totalStockBuyTarget = stockBuyTarget * price; //*итого за акции
		const progressTarget = stocksBuyUser * 100 / aroundStockLotsize; //*Цель достигнута в %
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