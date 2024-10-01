import { InitialData } from "../../redux/initialDataSlice/initialDataSlice";
import { UserData } from "../../redux/userDataSlice/userDataSlice";
import { Value } from "./columns";

export function getInvestmentValues(userData: UserData, securitiesData: InitialData): Value[] {
	const { coefficients, stocks, moneyUser } = userData;
	const { imoex, securities } = securitiesData;

	const weightCompanies = imoex.reduce((acc, company) => {
		const coeff = coefficients[company.ticker] ?? 1;
		return acc + coeff * company.weight;
	}, 0);

	return imoex.map((dataCompany) => {
		const { ticker, shortnames } = dataCompany; //? берем из данных
		let { weight } = dataCompany //? берем из данных
		const price = securities[ticker].prevprice; //? берем из данных
		const lotsize = securities[ticker].lotsize; //? берем из данных
		const stocksToBuyUser = stocks[ticker] ?? 0; //! вводит пользователь
		const coefficient = coefficients[ticker] ?? 1; //!вводит пользователь 
		const weightPortfolio = coefficient * weight * (1 / weightCompanies) * 100;
		//Math.round - нужен чтобы правильно округлить акции и посчитать процент
		const stocksToBuyTarget = Math.round((moneyUser * weightPortfolio) / (price * 100)); //* купить акций шт
		const targetstocksToBuyTarget = Math.round(stocksToBuyTarget / lotsize) * lotsize

		const totalStocks = targetstocksToBuyTarget * price
		const progressToTarget = stocksToBuyUser * 100 / targetstocksToBuyTarget;

		weight *= coefficient
		return {
			ticker,
			shortnames,
			weight,
			price,
			stocksToBuyUser,
			weightPortfolio,
			targetstocksToBuyTarget,
			totalStocks,
			progressToTarget,
			lotsize
		};
	});
}