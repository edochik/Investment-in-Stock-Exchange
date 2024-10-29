export function extractLocalStorageOnKey<T>(key: string, value: T): T {
	const data = localStorage.getItem(key);
	if (data === null) {
		return value
	}
	try {
		return JSON.parse(data)
	} catch (error) {
		return value
	}
}