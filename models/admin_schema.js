const mongoose=require('mongoose');
const Admin_schema=new mongoose.Schema({
    key	:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'User'
    },
    username:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true
    },
    order_id:{
        type:String
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
        },
        status:{
            type:String
        },
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Admin=mongoose.model("admin",Admin_schema);

module.exports=Admin;