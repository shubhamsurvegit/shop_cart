const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const bodyparser=require('body-parser');
const User = require('../models/schema');
const { parse } = require('path');
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
        const item=userdata.order_details.products.filter((i)=>i.id==product.id);
        if(item.length!=0 && item[0].size==product.size){
            const newquantity=parseInt(item[0].quantity)+1;
            var cost=parseInt(userdata.order_details.totalcost)+parseInt(product.price);
            User.findOneAndUpdate({username:req.session.username,
                "order_details.products.id":item[0].id
            },{
                $set:{
                    'order_details.products.$.quantity': newquantity,
                    'order_details.totalcost':cost
                }
            },{new:true},(error,data)=>{
                if(error){
                    console.log(error);
                }
            })
        }
        else{
            userdata.order_details.products.push(product);
            var cost=parseInt(userdata.order_details.totalcost)+parseInt(product.price);
            User.findOneAndUpdate({username:req.session.username},{
                $set:{
                    'order_details.products': userdata.order_details.products,
                    'order_details.totalcost':cost
                }
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
        const product=userdata.order_details.products.filter((i)=>i.id==check.id);
        var cost=parseInt(userdata.order_details.totalcost)-
        parseInt(product[0].price)*parseInt(product[0].quantity);
        const newcart=userdata.order_details.products.filter((i)=>i.id!=check.id);
        User.findOneAndUpdate({username:check.username},{
            // products:newcart
            $set:{
                'order_details.products': newcart,
                'order_details.totalcost':cost
            }
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
    var totalcost=0;
    User.findOne({username:req.session.username})
    .then(userdata=>{
        totalcost=parseInt(userdata.order_details.totalcost)
        const product=userdata.order_details.products.filter(product=>product.id==data.product_id)
        const old_quantity=product[0].quantity;
        const old_price=parseInt(old_quantity)*parseInt(product[0].price);
        const new_price=parseInt(data.quantity)*parseInt(product[0].price);    
        totalcost=totalcost-old_price;
        totalcost=totalcost+new_price;  
        User.findOneAndUpdate({username:data.username,
            "order_details.products.id":data.product_id
        },{
            $set:{
            'order_details.products.$.quantity':data.quantity,
            'order_details.totalcost':totalcost
            }
        },(error,data)=>{
            if(error){
                console.log(error);
            }
        })
        .catch((err)=>console.log(err));
    })
    .catch(err=>console.log(err));
  

})
module.exports=router;