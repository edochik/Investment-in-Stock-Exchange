import { Securities } from "../redux/slicer/securitiesSlicer";
interface FieldMetadata {
	type: string,
	bytes?: number,
	max_size?: number
}

type Metadata = Record<string, FieldMetadata>
type Columns = string[];
type Data = (string | number | null)[][];
interface Dataset {
	metadata: Metadata,
	columns: Columns,
	data: Data
}
export type Json = Record<string, Dataset>

export function formatImoex<T>(data: Json): T[] {
	const keys = data.analytics.columns
	const companies = data.analytics.data;
	return companies.map((company) => {
		const array = company.map((elem, index) => [keys[index].toLowerCase(), elem])
		return Object.fromEntries(array)
	})
}


export function formatSecurities(data: Json) {
	const keys = data.securities.columns
	const companies = data.securities.data;
	const result: Record<string, Securities> = Object.create(null);
	companies.forEach((company) => {
		const array = company.map((elem, index: number) => [keys[index].toLowerCase(), elem])
		const object: Securities = Object.fromEntries(array)
		const key = company[0]
		if (key !== null) {
			result[key] = object
		}
	})
	return result
}
