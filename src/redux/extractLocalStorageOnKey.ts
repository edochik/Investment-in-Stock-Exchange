export function extractLocalStorageOnKey<T>(key: string, value: T): T {
	const cart = localStorage.getItem(key);
	if (cart === null) {
		return value
	}
	try {
		return JSON.parse(cart)
	} catch (error) {
		return value
	}
}