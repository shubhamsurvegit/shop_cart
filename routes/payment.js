const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const bodyparser=require('body-parser');
const User = require('../models/schema');
const bodyparserurl=bodyparser.urlencoded({extended:true})
const keys=require('../models/keys');
const stripe=require('stripe')(keys.Private_key)

router.get('/pay',(req,res)=>{
    User.findOne({username:req.session.username})
    .then((userdata)=>{
        res.render('pay',{userdata:userdata});
    })
    .catch((err)=>console.log(err));

})

router.get('/payment',(req,res)=>{
    User.findOne({username:req.session.username})
    .then((userdata)=>{
        res.render('payment',{key:keys.Publishable_key,userdata:userdata})
    })
    .catch((err)=>console.log(err));
    
})

router.post('/adddetail',bodyparserurl,(req,res)=>{
    User.findOneAndUpdate({username:req.session.username},{
        $set:{
            'order_details.payment_method':req.body.payment_method?req.body.payment_method:'',
            'order_details.address': req.body.address1+" "+req.body.address2+" "+req.body.address3,
        } 
        },(err,data)=>{
            if(err){
                console.log(err);
            }
    })
    .catch(err=>console.log(err));
    // res.redirect('http://localhost:5000/payment');
})


router.post('/payment',bodyparserurl,(req,res)=>{
    User.findOneAndUpdate({username:req.session.username},{
        $set:{
            'order_details.payment_method':'Online with card',
        } 
        },(err,userdata)=>{
            if(userdata){
                stripe.customers.create({ 
                    email: req.body.stripeEmail, 
                    source: req.body.stripeToken, 
                    name: userdata.username, 
                }) 
                .then((customer) => { 
            
                    return stripe.charges.create({ 
                        amount: userdata.order_details.totalcost,    
                        currency: 'INR', 
                        customer: customer.id 
                    }); 
                }) 
                .then((charge) => { 
                    res.send(charge) // If no error occurs 
                }) 
                .catch((err) => { 
                    res.send(err)    // If some error occurs 
                });
            }
            else{
                console.log(err);
            }
    })
    .catch(err=>console.log(err));
})


module.exports=router;