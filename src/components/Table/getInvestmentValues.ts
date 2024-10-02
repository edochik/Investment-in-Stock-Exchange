import { InitialData } from "../../redux/initialDataSlice/initialDataSlice";
import { UserData } from "../../redux/userDataSlice/userDataSlice";
import { Value } from "./columns";

export function getInvestmentValues(userData: UserData, securitiesData: InitialData): Value[] {
	const { coefficients, stocks, moneyUser } = userData;
	const { imoex, securities } = securitiesData;

	const weightCompanies = 1 / imoex.reduce((acc, company) => {
		const coeff = coefficients[company.ticker] ?? 1;
		return acc + coeff * company.weight;
	}, 0);

	return imoex.map((dataCompany) => {
		const { ticker, shortnames } = dataCompany;
		let { weight } = dataCompany
		const price = securities[ticker].prevprice;
		const lotsize = securities[ticker].lotsize;
		const stocksBuyUser = stocks[ticker] ?? 0;
		const coefficient = coefficients[ticker] ?? 1;
		const weightPortfolio = coefficient * weight * weightCompanies * 100;
		//Math.round - нужен чтобы правильно округлить акции и посчитать процент
		const stockBuy = Math.round((moneyUser * weightPortfolio) / (price * 100)); //* купить акций шт
		const aroundStockOnLotsize = Math.round(stockBuy / lotsize) * lotsize;
		const stockBuyTarget = stocks[ticker] ? aroundStockOnLotsize - stocks[ticker] : aroundStockOnLotsize
		const totalSum = stockBuyTarget * price
		const progressToTarget = stocksBuyUser * 100 / aroundStockOnLotsize;

		weight *= coefficient
		return {
			ticker,
			shortnames,
			weight,
			price,
			stocks,
			stocksBuyUser,
			weightPortfolio,
			aroundStockOnLotsize,
			stockBuyTarget,
			totalSum,
			progressToTarget,
		};
	});
}