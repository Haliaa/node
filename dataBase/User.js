const {Schema ,model} = require("mongoose");

const userSchema = new Schema({
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
        required:true
    },
    password:{
        type:String,
        required:true,
    }
}, {timestamps:true})

module.exports = model('user', userSchema)
