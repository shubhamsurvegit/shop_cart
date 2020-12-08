const mongoose=require('mongoose');
const Userschema=new mongoose.Schema({
    username:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    },
    products:[{
        id:Number,
        img:String,
        name:String,
        size:String,
        quantity:Number,
        price:Number
    }],
    date:{
        type:Date,
        default:Date.now
    }
})

const User=mongoose.model("users",Userschema);

module.exports=User;