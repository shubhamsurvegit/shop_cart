const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const bodyparser=require('body-parser');
const User = require('../models/schema');
const Admin=require('../models/admin_schema')
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

// router.post('/adddetail',bodyparserurl,(req,res)=>{
//     User.findOneAndUpdate({username:req.session.username},{
//         $set:{
//             'order_details.payment_method':req.body.payment_method?req.body.payment_method:'',
//             'order_details.address': req.body.address1+" "+req.body.address2+" "+req.body.address3,
//         } 
//         },(err,data)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 User.findOne({username:req.session.username})
//                 .then((userdata)=>{
//                     const data=userdata.myorders;
//                     data.push(userdata.order_details);
//                     User.findOneAndUpdate({username:req.session.username},{
//                         order_details:{
//                             totalcost:0,
//                             address:'',
//                             products:[
//                             ],
//                             payment_method:""
//                         },
//                         myorders:data
//                     },({new:true}),(err,data)=>{
//                         if(err){
//                             console.log(err)
//                         }
//                     })
//                 })
//                 .catch((err)=>console.log(err));
//             }
//     })
//     .catch(err=>console.log(err));
// })

router.post('/add_detail',bodyparserurl,(req,res)=>{
    if(req.body.paywithcard){
        User.findOne({username:req.session.username})
        .then((userdata)=>{
            userdata.order_details.payment_method="PayWithCard";
            userdata.order_details.address=req.body.address;
            userdata.save()
            .then((newuserdata)=>{
                res.redirect('/payment')
            })
            .catch((err)=>res.send(err));
        })
        .catch((err)=>res.send(err));

    }
    else{
        User.findOne({username:req.session.username})
        .then((userdata)=>{
            userdata.order_details.payment_method="CashOnDelivery";
            userdata.order_details.address=req.body.address;
            userdata.order_details.status="Ordered";
            userdata.myorders.push(userdata.order_details)
            userdata.order_details.address="";
            userdata.order_details.totalcost=0;
            userdata.order_details.payment_method="";
            userdata.order_details.products=[];
            userdata.save()
            .then((newuserdata)=>{
                const data={
                    order_id:newuserdata.myorders[newuserdata.myorders.length-1]._id,
                    key:newuserdata._id,
                    username:newuserdata.username,
                    email:newuserdata.email,
                    order_details:newuserdata.myorders[newuserdata.myorders.length-1]
                }
                Admin.create(data)
                .then((admin_data)=>{
                    res.redirect('/myorders')
                })
                .catch((err)=>res.send(err))
                
            })
            .catch((err)=>res.send(err))
        })    
        .catch((err)=>res.send(err))
    }
})


// router.post('/payment',bodyparserurl,(req,res)=>{
//     User.findOneAndUpdate({username:req.session.username},{
//         $set:{
//             'order_details.payment_method':'Online with card',
//         } 
//         },(err,userdata)=>{
//             if(userdata){
//                 stripe.customers.create({ 
//                     email: req.body.stripeEmail, 
//                     source: req.body.stripeToken, 
//                     name: userdata.username, 
//                 }) 
//                 .then((customer) => { 
            
//                     return stripe.charges.create({ 
//                         amount: userdata.order_details.totalcost,    
//                         currency: 'INR', 
//                         customer: customer.id 
//                     }); 
//                 }) 
//                 .then((charge) => { 
//                     User.findOne({username:req.session.username})
//                     .then((userdata)=>{
//                         console.log(userdata.myorders);
//                         const data=userdata.order_details;
//                         User.findOneAndUpdate({username:req.session.username},{
//                             order_details:{
//                                 totalcost:0,
//                                 address:'',
//                                 products:[
//                                 ],
//                                 payment_method:"",
//                             },
//                             myorders:data
//                         },({new:true}),(err,data)=>{
//                             if(err){
//                                 console.log(err)
//                             }
//                         })
//                     })
//                     .catch((err)=>console.log(err))
//                 .catch((err)=>console.log(err));
//                     res.redirect('/home') // If no error occurs 
//                 }) 
//                 .catch((err) => { 
//                     console.log("AD")
//                     res.send(err)    // If some error occurs 
//                 });
//             }
//             else{
//                 console.log(err);
//             }
//     })
//     .catch(err=>console.log(err));
// })


router.post('/payment',bodyparserurl,(req,res)=>{
    User.findOne({username:req.session.username})
    .then((userdata)=>{
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
        User.findOne({username:req.session.username})
        .then((userdata)=>{
            userdata.order_details.status="Ordered";
            userdata.myorders.push(userdata.order_details);
            userdata.order_details.address="";
            userdata.order_details.totalcost=0;
            userdata.order_details.payment_method="";
            userdata.order_details.products=[];
            userdata.save()
            .then((newuserdata)=>{
                const data={
                    key:newuserdata._id,
                    order_id:newuserdata.myorders[newuserdata.myorders.length-1]._id,
                    username:newuserdata.username,
                    email:newuserdata.email,
                    order_details:newuserdata.myorders[newuserdata.myorders.length-1]
                }
                Admin.create(data)
                .then((admin_data)=>{
                    res.redirect('/myorders')
                })
                .catch((err)=>res.send(err))
            }) 
            .catch((err)=>res.send(err))
            // res.send("Success") If no error occurs
        .catch((err)=>res.send(err));
        })
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
    }
    else{
        console.log(err)
    }
    })
    .catch((err)=>res.send(err))
})


router.get('/addtomyorders',(req,res)=>{
    res.send("AS");
})

module.exports=router;