export function extractLocalStorageOnKey<T>(key: string, nullOrError: T): T {
	const cart = localStorage.getItem(key);
	if (cart === null) {
		return nullOrError
	}
	try {
		return JSON.parse(cart)
	} catch (error) {
		return nullOrError
	}
}