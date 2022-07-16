const User = require('../dataBase/User')

module.exports = {
    findUsers:(params={})=>{
       return User.find(params)
    },
    findUser:(params={})=>{
        return User.findOne(params)
    },
    createUser:(user)=>{
        return User.create(user)
    },
    //options={new: true} -щоб повертало вже оновлені дані
    updateUser:(params, userData, options={new: true})=>{
        return User.findOneAndUpdate(params, userData, options)
    },
    deleteUser:(params)=>{
        return User.deleteOne(params)
    }
}
