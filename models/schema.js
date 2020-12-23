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
    order_details:{
        totalcost:{
            type:"Number",

        },
        address:{
            type:"String",

        },
        products:[{
            id:Number,
            img:String,
            name:String,
            size:String,
            quantity:Number,
            price:Number
        }],
        payment_method:{
            type:String
        },
        payment_detail:{
            type:Object
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const User=mongoose.model("users",Userschema);

module.exports=User;