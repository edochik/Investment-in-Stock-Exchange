export type Values = (string | number | null)[];
export interface Dataset {
	columns: string[],
	data: Values[];
}

export async function fetchData<T extends string>(url: string): Promise<{ [key in T]: Dataset }> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`${response.status}`)
	}
	return await response.json();
}
