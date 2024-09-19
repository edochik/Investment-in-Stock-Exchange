// const object = [{ id: 1, secid: 'test1' }, { id: 2, secid: 'test2' }, { id: 3, secid: 'test3' }]


// console.log(Object.fromEntries(object.map(s => [s.secid, s])))


// const stocksUser = {
// 	'AFRS': 1,
// 	'AFLT': 2,
// 	'AGRO': 0
// }


// const coefficientUser = {
// 	'AFRS': 1,
// 	'AFLT': 2,
// 	'AGRO': 0
// }

const obj = {}

const obj2 = {
	'AFRS': 2,
}

const obj3 = Object.assign({}, obj, obj2)
console.log(obj3);