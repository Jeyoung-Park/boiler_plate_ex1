const express=require('express');
const app=express();
const port=5000;
const bodyParser=require('body-parser');
const {User}=require('./models/User');

const config=require('./config/key');

//application/x-www-form-urlencoded 으로 된 것을 가져올 수 있음
app.use(bodyParser.urlencoded({extended:true}));

//application/json으로 된 것들을 가져올 수 있음
app.use(bodyParser.json());

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

app.post('/register', (req, res)=>{
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

app.listen(port, ()=>console.log(`Example app listening on port ${port}!`))