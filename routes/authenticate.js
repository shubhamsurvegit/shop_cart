const { Router } = require('express');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const bodyparser=require('body-parser');
const User = require('../models/schema');
const bodyparserurl=bodyparser.urlencoded({extended:false})


router.get('/home',(req,res)=>{
    res.render('home',{username:req.session.username})
});

router.get('/login',(req,res)=>res.render('login'));
router.get('/register',(req,res)=>{
    res.render('register',{data:false})
})

router.post('/register',bodyparserurl,(req,res)=>{
    const errors=[];
    const data={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword,
        products:[
                
        ]
    }
    if(!data.username || !data.email || !data.password || !data.confirmpassword){
        errors.push({msg:"Please fill in all fields"});
    }
    if(req.body.password!==req.body.confirmpassword){
        errors.push({msg:"Passwords do not match"});
    }
    if(errors.length>0){
        res.render('register',{errors:errors,data:data});
    }
    else{
        User.findOne(
            {
                $or:[
                    {username:data.username},{email:data.email}
                ]
            })
        .then((userdata)=>{
            if(userdata){
                errors.push({msg:"User already exists"});
                res.render('register',{errors:errors});
            }
            else{
                bcrypt.genSalt(10,(err,salt)=>
                bcrypt.hash(data.password,salt,(err,hash)=>{
                    if (err) throw err;
                    data.password=hash;
                    User.create(data)
                    .then((data)=>{
                        req.session.username=data.username;
                        res.redirect('/home');
                    })
                    .catch((err)=>res.send(err));
                }))
            }
        })
    }
})

router.post('/login',bodyparserurl,(req,res)=>{

    const errors=[];
    const data={
        username:req.body.username,
        password:req.body.password
    }
    if(!data.username || !data.password){
        errors.push({msg:"Please fill in all fields"})
        res.render('login',{errors:errors});
    }
    else{
        User.findOne({username:data.username})
        .then((userdata)=>{
            if(userdata){
                bcrypt.compare(data.password,userdata.password,(err,isMatch)=>{
                    if(isMatch){
                        req.session.username=data.username;
                        res.redirect('/home');
                    }
                    else{
                        errors.push({msg:"Incorrect Password"});
                        res.render('login',{errors:errors});
                    }
                })
            }
            else{
                errors.push({msg:"User does not exist"})
                res.render('login',{errors:errors})
            }
        })
        .catch((err)=>res.send(err));
    }
})


router.get('/logout',(req,res)=>{
    delete req.session.username;
    const errors=[];
    errors.push({msg:"You are logged out"});
    res.render('login',{errors:errors});
})
module.exports=router;