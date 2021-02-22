const express=require('express');
const mongoose=require('mongoose');
const session = require('express-session');
const socketio=require('socket.io');

const http=require('http')
const app=express();


const server=http.createServer(app);
const io=socketio(server)

app.set('view engine','ejs');

app.use('/styles',express.static('styles'))
app.use(session({secret: "Shh, its a secret!",resave:false}));

const url="mongodb://localhost:27017/cart";
// const url = "mongodb+srv://akash:akash1234@cluster0.4ayge.mongodb.net/cart?retryWrites=true&w=majority";
const Publishable_key="pk_test_51HY7eBLXvUk3ZE2kg93zIlH67ftUxoZYGRcem3mddQocLZz3LKwzn1GtPSSNu8GQH4ZJg1Icj4n3HCltZIrfkkZS00incutQb6"
const Private_key="sk_test_51HY7eBLXvUk3ZE2kQddnLPrXtFe40ST28tahw4xrzCXfeGOAjlaewqZjkzEUvda2HOTH9oem61Z2IRzzF9kWDEgC008g4piumq"

io.on('connection',socket=>{
    socket.emit('message',"Welcome ")

    socket.on('msg',(msg)=>{
        io.emit('toclient',msg)
    })
})

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log(err));

app.use('/',require('./routes/authenticate'))

app.use('/',require('./routes/cart'))

app.use('/',require('./routes/payment'))

app.use('/',require('./routes/myorders'))

app.use('/',require('./routes/payment'))

app.use('/',require('./routes/admin'))

const PORT=process.env.PORT || 5000;
server.listen(PORT,()=>console.log("Server Running..."));