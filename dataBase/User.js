const {Schema ,model} = require("mongoose");
const passwordService = require('../services/password.service')

const UserSchema = new Schema({
    name:{
        type:String,
        required:true, //поле обов'язкове для заповнення
        trim: true //чистити від пробілів
    },
    email:{
        type:String,
        required:true, //поле обов'язкове для заповнення
        trim: true, //чистити від пробілів
        lowercase: true, // передворює до мал букв
        unique:true
    },
    age:{
        type:Number,
        // required:false // якщо поле false то можна і не писати
        default:20, //якшо поле не вказали то використається дефолтне
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{    // ім'я картинки
        type:String,
    }
}, {timestamps:true}) // пише коли створився, коли оновився
//"_v" - версія, показує скік раз об'єкт оновився

//1-ИЙ ВАРІК НАПИСАННЯ ФУНКЦІЇ
UserSchema.methods = { //for SINGLE record // THIS - RECORD
    async comparePasswords(password){
         await passwordService.comparePassword(this.password, password);
    }
}

//2-ИЙ ВАРІК НАПИСАННЯ ФУНКЦІЇ
UserSchema.statics = { // for schema(MANY RECORDS) // THIS - SCHEMA
    createWithHashPassword: async function(userToSave){
        const hashedPassword = await passwordService.hashPassword(userToSave.password);


        //this - це сама UserSchema
        return this.create({...userToSave, password: hashedPassword})
    }
}

module.exports = model('user', UserSchema)
