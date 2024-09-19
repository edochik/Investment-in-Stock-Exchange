export {}
// import { formatImoex, Json } from "../utils/helper";

// export async function getImoexApi<T>(Api: string): Promise<T[]> {
// 	try {
// 		const response = await fetch(Api);
// 		if (!response.ok) {
// 			throw new Error(`Request failed with status ${response.status}`) //??? ругался что передаю Number
// 		}
// 		const objectJson: Json = await response.json();
// 		return formatImoex(objectJson);
// 	} catch (error: unknown) {
// 		if (error instanceof Error) {
// 			throw new Error(error.message)
// 		}
// 		// ???
// 		throw new Error(``)
// 	}
// }
