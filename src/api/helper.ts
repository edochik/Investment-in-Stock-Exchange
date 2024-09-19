type Values = (string | number | null)[];
interface Dataset {
	columns: string[],
	data: Values[];
}

export async function fetchData<T extends string>(url: string): Promise<{ [key in T]: Dataset }> {
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`${response.status}`)
	}
	return await response.json()
}

export function formatSecurityData<T>(data: Dataset): T[] {
	const keys = data.columns;
	const companies = data.data;
	return companies.map((company) => {
		const result = company.map((elem, index) => [keys[index].toLowerCase(), elem])
		return Object.fromEntries(result)
	})
}
