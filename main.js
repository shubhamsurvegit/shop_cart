const express=require('express');
const mongoose=require('mongoose');
const session = require('express-session');
const app=express();

app.set('view engine','ejs');

app.use('/styles',express.static('styles'))
app.use(session({secret: "Shh, its a secret!",resave:false}));
// const url="mongodb://localhost:27017/cart";
const url = "mongodb+srv://akash:akash1234@cluster0.4ayge.mongodb.net/cart?retryWrites=true&w=majority";

mongoose.connect(url,{useNewUrlParser:true})
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log(err));

app.use('/',require('./routes/authenticate'))

app.use('/',require('./routes/cart'))

app.use("", (req, res) => {
    res.render("home");
})

app.use('/',require('./routes/payment'))

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log("Server Running..."));