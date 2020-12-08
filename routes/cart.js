const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const bodyparser=require('body-parser');
const User = require('../models/schema');
const bodyparserurl=bodyparser.urlencoded({extended:true})

router.get('/cart',(req,res)=>{
    User.findOne({username:req.session.username})
    .then((userdata)=>{
        if(userdata!=null){
            res.render('cart',{userdata:userdata});
        }
        else{
            res.render('cart')
        }
   
    })
    .catch((err)=>console.log(err));
});

router.post('/add',bodyparserurl,(req,res)=>{
    const product=JSON.parse(Object.keys(req.body)[0]);
    User.findOne({username:req.session.username})
    .then((userdata)=>{
        const item=userdata.products.filter((i)=>i.id==product.id);
        if(item.length!=0){
            const newquantity=parseInt(item[0].quantity)+1;
            User.findOneAndUpdate({username:req.session.username,
                "products.id":item[0].id
            },{
                $set:{
                    'products.$.quantity': newquantity,
                }
            },{new:true},(error,data)=>{
                if(error){
                    console.log(error);
                }
            })
        }
        else{
            userdata.products.push(product);
            User.findOneAndUpdate({username:req.session.username},{
                products:userdata.products
            },{new:true},(error,data)=>{
                if(error){
                    console.log(error);
                }
            })
        }
   
    })
    .catch((err)=>console.log(err));
})

router.post('/remove',bodyparserurl,(req,res)=>{
    const check=JSON.parse(Object.keys(req.body)[0]);
    User.findOne({username:check.username})
    .then((userdata)=>{
        const newcart=userdata.products.filter((i)=>i.id!=check.id);
        User.findOneAndUpdate({username:check.username},{
            products:newcart
        },(err,data)=>{
            if(err){
                console.log(err)
            }
        })
    })
    .catch((err)=>console.log(err));
})

router.post('/updatequantity',bodyparserurl,(req,res)=>{
    const data=JSON.parse(Object.keys(req.body)[0]);
    User.findOneAndUpdate({username:data.username,
        "products.id":data.product_id
    },{
        $set:{
        'products.$.quantity':data.quantity
        }
    },(error,data)=>{
        if(error){
            console.log(error);
        }
    })
    .catch((err)=>console.log(err));

})
module.exports=router;