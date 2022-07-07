// function createBillionUsers(){
//     console.log('Billion users was created')
// }
const SMSService = require('./message.service')

function createUser (name,age){

    SMSService.sendSMS('09865','Welcome on bord')

    return {
        name,
        age,
        sayHey:()=>{
            console.log(`Hey my name is ${name} and I'm ${age} years.`)
        }
    }
}

module.exports = {
    createUser
}
// createBillionUsers()

// module.exports = {
// user:{name:'Emily'}
//     }

// module.exports.age = 23;
