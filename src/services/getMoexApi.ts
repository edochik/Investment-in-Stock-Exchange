import { Imoex } from "../redux/slicer/imoexSlicer";
import { Securities } from "../redux/slicer/securitiesSlicer.js";
import { formatImoex, formatSecurities } from "../utils/helper";

export async function getMoexApi(apis: string[]):
	Promise<{ imoex: Imoex[], securities: Record<string, Securities> }> {
	try {
		const responses = await Promise.all(apis.map(api => fetch(api)));
		
		responses.forEach(response => {
			if (!response.ok) {
				throw new Error(`Request failed with status${response.status}`);
			}
		})
		const data = await Promise.all(responses.map(response => response.json()))
		return {
			imoex: formatImoex(data[0]),
			securities: formatSecurities(data[1])
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`${error.message}`)
		}
		throw new Error('')
	}
}