//*========================================================================
//*==========================что на ум пришло============================
// const date = new Date()

// function getTransformDate(toDayRaw, dateString) {
// 	const curDate = new Date(toDayRaw)
// 	const oldDate = new Date(dateString)
// 	const curDateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
// 	const oldDateString = `${oldDate.getDate()}.${oldDate.getMonth()}.${oldDate.getFullYear()}`
// 	return curDateString > oldDateString
// }

// console.log(getTransformDate(date, '2024-10-23T11:23:15.368Z'));

//*========================================================================
//* сравнивать с приведением даты к строке
// обрезать дату до T а потом сравнить ? 
// перевести в стринг, найти индекс T, отрезать с начала до T. 
// потом сравнить

// const newDate = new Date()

// function isSameDayUseString(toDayRaw, dateString) {
// 	const toDate = toDayRaw.toISOString().split('T')[0]
// 	const oldDate = dateString.toString().split('T')[0]
// console.log('oldDay >>>>>>>>>>>>', oldDate);
// console.log('toDay  >>>>>>>>>>>>', toDate);
// 	return toDate > oldDate;
// }
// console.log(isSameDayUseString(newDate, '2024-10-22T11:23:15.368Z'));

//*========================================================================
//*сравнивать обнуля временную зону, т.е без разницы где ты находишься сравниваются только год-месяц-день
// const date = new Date()

// function isSameDay(toDayRaw, dateString) {
// 	const oldDay = new Date(dateString).setHours(0, 0, 0, 0);
// 	const toDay = new Date(toDayRaw).setHours(0, 0, 0, 0)
// 	return toDay > oldDay;
// }
// console.log(isSameDay(date, '2024-10-22T11:23:15.368Z'));


//*========================================================================
//? [1] если мы используем конструктор то месяц указываем с нуля new Date(2024,0,23)
//? [2] если мы пытаемся использовать не существующие данные new Date('2024-01-44') вы водится 'Invalid Date'
//? можно будет сравнить с помощью new Date('2024-01-44').toString() === 'Invaild Date'
//? [3] метод date.toString() меняет формат даты на текущий формат по времени в комьютере/настройкаx
//? можно использовать метод date.toISOString() выводится будет в том же формате '2024-10-22T11:23:15.368Z'
//? [4] можно сбросить временную зону date.setHours(0, 0, 0, 0)


const array = ["A", "B", "C", "D"]

console.log(array.find(item => item === 'A'));