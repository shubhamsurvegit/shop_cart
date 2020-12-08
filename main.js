const express=require('express');
const mongoose=require('mongoose');
const session = require('express-session');
const app=express();

app.set('view engine','ejs');

app.use('/styles',express.static('styles'))
app.use(session({secret: "Shh, its a secret!",resave:false}));
const url="mongodb://localhost:27017/cart";

mongoose.connect(url,{useNewUrlParser:true})
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log(err));

app.use('/',require('./routes/authenticate'))

app.use('/',require('./routes/cart'))

app.listen(5000,()=>console.log("Server Running..."));