export const localStorageMock = (function () {
	let store: Record<string, string> = {};
	return {
		getItem(key: string) {
			return store[key] || null
		},
		setItem(key: string, value: string): void {
			store[key] = value
		},
		clear(): void {
			store = {};
		},
		removeItem(key: string): void {
			delete store[key];
		},
		getAll() {
			return store;
		},
	};
})();