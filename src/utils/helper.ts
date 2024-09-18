import { Securities } from "../redux/slicer/securitiesSlicer";

export function formatImoex<T>(data: any): T[] {
	const keys: string[] = data.analytics.columns
	const companies: (string | number)[][] = data.analytics.data;
	return companies.map((company) => {
		const array = company.map((elem, index) => [keys[index].toLowerCase(), elem])
		return Object.fromEntries(array)
	})
}

//formatImoex
//formatSecurities

export function formatSecurities(data: any): Record<string, Securities> {
	const keys: string[] = data.securities.columns
	const companies: (string | number)[][] = data.securities.data;
	const result: Record<string, Securities> = Object.create(null);
	companies.forEach((company: any) => {
		const array = company.map((elem: unknown, index: number) => [keys[index].toLowerCase(), elem])
		const object: Securities = Object.fromEntries(array) as Securities
		const key = company[0]
		result[key] = object
	})
	// console.log(companies);
	return result
}
