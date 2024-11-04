export function extractLocalStorageOnKey<T>(key: string, value: T): T {
	const data = localStorage.getItem(key);
	console.log("data", data)
	console.log("localStorage", localStorage)
	if (data === null) {
		return value
	}
	try {
		return JSON.parse(data)
	} catch (error) {
		return value
	}
}