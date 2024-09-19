export {}
// import { Securities } from "../redux/slicer/securitiesSlicer.js";
// import { formatSecurities, Json } from "../utils/helper";

// export async function getSecuritiesApi(Api: string): Promise<Record<string, Securities>> {
// 	try {
// 		const response = await fetch(Api);
// 		if (!response.ok) {
// 			throw new Error(`Request failed with status ${response.status}`) //??? ругался что передаю Number
// 		}
// 		const objectJson: Json = await response.json();
// 		return formatSecurities(objectJson);
// 	} catch (error: unknown) {
// 		if (error instanceof Error) {
// 			throw new Error(error.message)
// 		}
// 		// ???
// 		throw new Error(``)
// 	}
// }
