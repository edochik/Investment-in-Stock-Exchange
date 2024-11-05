import { Dataset } from "./helper";

export function formatSecurityData<T>(data: Dataset): T[] {
	const keys = data.columns;
	const companies = data.data;
	return companies.map((company) => {
		const result = company.map((elem, index) => [keys[index].toLowerCase(), elem]);
		return Object.fromEntries(result);
	})
}
