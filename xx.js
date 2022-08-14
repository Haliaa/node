// const user = {
//     name: 'Katya',
//     age: 22,
//     key: 'NO NOO NOOO'
// }

// function getObjectInfo(key){
//     console.log(user.key)
// }
// getObjectInfo('age') // відповідь: NO NOO NOOO

// function getObjectInfo(key){
//     console.log(user[key])
//     console.log(user['age'])
//     console.log(user.age)
// }
// getObjectInfo('age') // відповідь: 26 26 26

// function getObjectInfo(key, value){
//     user[key] = value;
//     console.log(user)
// }
// getObjectInfo('phone', 'Samsung')
// getObjectInfo('car', true)

// const emailTempl = {
//     W: 'W',
//     FP: 'FP'
// }
//
// const tempInfo = {
//     [emailTempl.W]: {
//         s:'Wel'
//     }
// }
// console.log(tempInfo) //{ W: { s: 'Wel' } }

const dayjs = require('dayjs')

const oneMonthBeforeNow = dayjs().subtract(1, 'months')

console.log(oneMonthBeforeNow.toString())
console.log('HELLO FROM XX.JS !!!!!!!!!!!!!')

// dayjs().subtract(1, 'months')



