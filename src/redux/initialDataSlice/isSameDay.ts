export function isSameDay(toDayRaw: Date, dateString: Date) {
	console.log('>>>>>>>>>>>>>>>>>> isSameDay <<<<<<<<<<<<<<<<<<<<<<<');
	const oldDay = new Date(dateString).setHours(0, 0, 0, 0);
	const toDay = new Date(toDayRaw).setHours(0, 0, 0, 0);
	return toDay > oldDay;
}