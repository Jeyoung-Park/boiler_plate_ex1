const express=require('express');
const app=express();
const port=5000;
const bodyParser=require('body-parser');
const {User}=require('./models/User');
const {auth}=require('./middleware/auth');
const cookieParser=require('cookie-parser');

const config=require('./config/key');

//application/x-www-form-urlencoded 으로 된 것을 가져올 수 있음
app.use(bodyParser.urlencoded({extended:true}));

//application/json으로 된 것들을 가져올 수 있음
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose=require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true,
})
.then(()=>{
    console.log('MongoDB connected...');
})
.catch(err=>console.log(err)); 

app.get('/', (req, res)=>res.send('Hello world~~~~~~!'))

app.get('/api/hello', (req, res)=>{
    res.send("안녕하세요~");
})

app.post('/api/users/register', (req, res)=>{
    //회원 가입 할 떄 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다
    
    const user=new User(req.body);

    //정보들을 유저 모델에 저장
    user.save((err, userInfo)=>{
        if(err) return res.json({success:false, err});
        return res.status(200).json({
            success:true,
        })
    });
})

app.post('/api/users/login', (req, res)=>{
    //요청된 이메일을 데이터베이스에서 있는지 찾아봄
    User.findOne({email:req.body.email}, (err, user)=>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message:"제공된 이메일에 해당되는 유저가 없습니다."
            })
        }
        //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch){
                return res.json({
                    loginSuccess:false,
                    message:'비밀번호가 틀렸습니다.',
                })
            }
            // if(err){
            //     return res.json({

            //     })
            // }
            //비밀번호까지 맞다면 토큰을 생성
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);

                //토큰을 저장한다. 어디에? 쿠키..로컬스토리지..

                //쿠키에 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess:true,
                    userId:user._id,
                });
            });
        });
    })

})

app.get('/api/users/auth', auth, (req, res)=>{
    //여기에 들어왔다는 것은 middleware에서 auth를 통과했다는 얘기
    res.status(200).json({
        _id:req.user._id,
        isAdmin:req.user.role===0?false:true,
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role,
        image:req.user.image,
    })
})

app.get('/api/users/logout', auth, (req, res)=>{
    User.findOneAndUpdate({_id:req.user._id},
        {token:""}
        ,(err, user)=>{
            if(err) return res.json({success:false, err});
            return res.status(200).send({
                success:true,
            })
        }
    )
})

app.listen(port, ()=>console.log(`Example app listening on port ${port}!`))