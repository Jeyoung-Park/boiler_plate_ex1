const express=require('express');
const app=express();
const port=5000;

const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://jeyoungPark:qwer1234*@boilerplate.0lx7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'.{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true,
})
.then(()=>{
    console.log('MongoDB connected...');
})
.catch(err=>console.log(err));

app.get('/', (req, res)=>res.send('Hello world!22222222222'))

app.listen(port, ()=>console.log(`Example app listening on port ${port}!`))