//schema 만들기

const mongoose=require('mongoose');
//비밀번호를 암호화하는 모듈
const bcrypt=require('bcrypt');
const saltRounds=10;

const jwt=require('jsonwebtoken');

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
        // maxlength:50,
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

//'save'를 하기 전에 함수를 실행
userSchema.pre('save', function(next){
    
    var user=this; //this가 위의 userSchema를 가리킴

    //비밀번호가 변경되었을 경우에만 비번 암호화 실행
    if(user.isModified('password')){
        //비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);

            // hash: 암호화된 비번
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password=hash;
                next();
            });
        })
        
        //next가 실행되면 user.save 함수로 이동
    }
    //비밀번호를 바꾸지 않는 경우
    else{
        next();
    }
});

userSchema.methods.comparePassword=function(plainPassword, cb){
    //비밀번호릉 암호화하고 암호화된 비밀번호와 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        else cb(null, isMatch);
    })
}

userSchema.methods.generateToken=function(cb){
    
    var user=this;
    
    //jsonwebtoken을 이용해 token을 생성
    // jwt.sign(user._id, 'secretToken');

    var token=jwt.sign(user._id.toHexString(), 'secretToken');

    user.token=token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    })
}

// 스키마를 모델로 감싸줌
const User=mongoose.model('User', userSchema);

module.exports={User};