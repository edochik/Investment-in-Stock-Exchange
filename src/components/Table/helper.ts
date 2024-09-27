import { Data } from "../../redux/dataSlice/dataSlice.js";
import { userData } from "../../redux/userDataSlice/userDataSlice";
import { RowValues } from "./columns";

export function companiesValues(userData: userData, data: Data): RowValues[] {
	const { imoex, securities } = data;
	const { coefficients, stocks, UserMoneyInput: moneyUser } = userData;

	const weightCompanies = imoex.reduce((acc, row) => {
		const coeff = coefficients[row.ticker] ?? 1;
		return acc + Number(coeff) * row.weight;
	}, 0);

	return imoex.map((dataCompany) => {
		const { ticker, shortnames, weight } = dataCompany;
		const price = securities[ticker].prevprice;
		const buyStocks = stocks[ticker] ?? 0;
		const coefficient = coefficients[ticker] ?? 1;
		const userWeight =
			Number(coefficient) * weight * (1 / weightCompanies) * 100;
		const targetBuyStocks = Math.round((moneyUser * userWeight) / (price * 100));
		const targetSumStocks = Math.round(targetBuyStocks * price);
		const targetStockPercent = Math.round((buyStocks / targetBuyStocks) * 100);
		return {
			ticker,
			shortnames,
			weight,
			price,
			buyStocks,
			userWeight,
			targetBuyStocks,
			targetSumStocks,
			targetStockPercent,
		};
	});
}