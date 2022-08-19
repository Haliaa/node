// OLD STARTING VERSION
// function createBillionUsers(){
// //     console.log('Billion users was created')
// // }
// const SMSService = require('./message.service')
//
// function createUser (name,age){
//
//     SMSService.sendSMS('09865','Welcome on bord')
//
//     return {
//         name,
//         age,
//         sayHey:()=>{
//             console.log(`Hey my name is ${name} and I'm ${age} years.`)
//         }
//     }
// }
//
// module.exports = {
//     createUser
// }
// // createBillionUsers()
//
// // module.exports = {
// // user:{name:'Emily'}
// //     }
//
// // module.exports.age = 23;

const User = require('../dataBase/User')


module.exports = {
    getUsersWithPagination: async (query) => {
        const {page = 1, perPage = 5, ...otherFilters} = query;     //otherFilters

        console.log(otherFilters)

        //ageGte
        //ageLte
        //search


        const filterQuery = _getUserFilterQuery(otherFilters);

        // console.log(searchObject)

        const skip = (page - 1) * perPage;  //0

        const users = await User.find(filterQuery).skip(skip).limit(perPage);
        const usersCount = await User.countDocuments(filterQuery);

        return {
            page,
            perPage,
            data: users,
            count: usersCount
        };
    }
}

function _getUserFilterQuery(otherFilters) {
    const searchObject = {};

    if (otherFilters.search) {
        Object.assign(searchObject, {
            $or: [
                {name: {$regex: otherFilters.search, $options: 'i'}},
                {email: {$regex: otherFilters.search, $options: 'i'}}   //$options: 'i' - ігнор регістру при пошуку
            ]
        })
    }
    if (otherFilters.ageGte) {
        Object.assign(searchObject, {
            age: {$gte: +otherFilters.ageGte}
        })
    }
    if (otherFilters.ageLte) {
        Object.assign(searchObject, {
            age: {
                ...searchObject.age || {},
                $lte: +otherFilters.ageLte
            }
        })
        return otherFilters;
    }

    console.log(JSON.stringify(searchObject, null, 2))

}

