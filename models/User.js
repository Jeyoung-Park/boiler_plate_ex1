//schema 만들기

const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        maxlength:50,
    },
    email:{
        type:String,
        trim:true,
        unique:1,
    },
    password:{
        type:String,
        maxlength:50,
    },
    role:{
        type:Number,
        default:0,
    },
    image: String,
    token:{
        type:String,
    },
    //토큰 유효기간
    tokenExp:{
        type:Number,
    }
})

// 스키마를 모델로 감싸줌
const User=mongoose.model('User', userSchema);

module.exports={User};