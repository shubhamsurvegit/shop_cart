const express=require('express');
const router=express.Router();
// const bcrypt=require('bcryptjs');
// const User = require('../models/schema');
const bodyparser=require('body-parser');
const Admin = require('../models/admin_schema');
const bodyparserurl=bodyparser.json()


router.get('/admin/home',(req,res)=>{
    console.log("FDG")
    res.render('admin_home');
})

router.get("/admin/orders",(req,res)=>{
    Admin.find({})
    .then((orders)=>{
    res.render('admin_home',{orders:orders});
    })
    .catch((err)=>res.send(err));
})

router.get('/admin/trackorder',(req,res)=>{
    Admin.findOne({order_id:req.query.id})
    .then((order)=>{
        if(order){
            res.render('admin_track',{order:order});
        }
        else{
            const errors=[];
            errors.push({msg:"Kindly login"})
            res.render('login',{errors:errors});
        }
    })
})

router.post('/change_status_admin',bodyparserurl,(req,res)=>{
    Admin.findOne({order_id:req.body.id})
    .then((order)=>{
        order.order_details.status=req.body.status;
        order.save();
    })
    .catch((err)=>console.log(err))
})


module.exports=router;
