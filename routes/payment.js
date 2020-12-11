const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const bodyparser=require('body-parser');
const User = require('../models/schema');
const bodyparserurl=bodyparser.urlencoded({extended:true})

router.get('/payment',(req,res)=>{
    res.render('payment')
})

module.exports=router;