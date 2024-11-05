export function extractLocalStorageOnKey<T>(key: string, defaultValue: T): T {
	const data = localStorage.getItem(key);
	if (data === null) {
		return defaultValue
	}
	try {
		return JSON.parse(data)
	} catch (error) {
		return defaultValue
	}
}