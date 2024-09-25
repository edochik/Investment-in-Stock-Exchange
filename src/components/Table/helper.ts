import { ImoexSecurity } from "../../domain/ImoexSecurity";
import { Security } from "../../domain/Security";

export function getTable(imoex: ImoexSecurity[], securities: Record<string, Security>) {
	return imoex.map((company) => {
		const { ticker, shortnames, weight } = company;
		const price = securities[ticker].prevprice;
		return { ticker, shortnames, weight, price };
	})
}

