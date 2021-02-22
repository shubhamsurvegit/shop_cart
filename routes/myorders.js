const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const bodyparser=require('body-parser');
const User = require('../models/schema');
const bodyparserurl=bodyparser.json()


router.get('/myorders',(req,res)=>{
    User.findOne({username:req.session.username})
    .then((userdata)=>{
        if(userdata){
            res.render('myorders',{userdata:userdata});
        }
        else{
            const errors=[];
            errors.push({msg:"Kindly login"})
            res.render('login',{errors:errors});
        }
    })
})

router.get('/trackorder',(req,res)=>{
    User.findOne({username:req.session.username})
    .then((userdata)=>{
        if(userdata){
            const order=userdata.myorders.filter(order=>order._id==req.query.id);
            res.render('track',{order:order[0]});
        }
        else{
            const errors=[];
            errors.push({msg:"Kindly login"})
            res.render('login',{errors:errors});
        }
    })
})


//change status
router.post('/change_status',bodyparserurl,(req,res)=>{
    User.findOne({username:req.session.username,"myorders._id":req.body.id})
    .then((order)=>{
        console.log(order)
        order.myorders[0].status=req.body.status
        order.save();
    })
    .catch((err)=>console.log(err))
})


module.exports=router;