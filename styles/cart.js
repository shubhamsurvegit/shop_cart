function rimu(e,username){
    const id=e.parentElement.textContent;

    const price=parseInt(e.parentElement.parentElement.children[3].textContent);
    const quantity=parseInt(e.parentElement.parentElement.children[2].children[0].textContent.match(/(\d+)/)[0])
    var totalamount=parseInt(document.getElementById('totalamount').innerHTML);
    
    const check={
        username:username,
        id:id
    }

    $.ajax({
        type:"POST",
        data:JSON.stringify(check),
        url:'http://localhost:5000/remove',
        success:function(msg){
            if(!msg){
                console.log("ERROR")
            }
        }
    })    
    totalamount=totalamount-(price*quantity);
    e.parentElement.parentElement.remove();

    document.getElementById('totalamount').innerHTML=totalamount;
}


function updatequantity(e,username,product_id){
    console.log(screen.height)
    const quantity=document.querySelector('#quantity');
    const inputbox=document.querySelector('.inputbox');
    inputbox.style.top=40+"%";
    console.log(e.parentElement.parentElement.parentElement.offsetTop)
    document.getElementById('cancel').addEventListener('click',()=>{
        inputbox.style.top=-40+"%";
    })
        
    document.getElementById('apply').addEventListener('click',()=>{
        var totalamount=parseInt(document.getElementById('totalamount').innerHTML);
        const quantity=parseInt(e.parentElement.parentElement.parentElement.children[2].children[0].textContent.match(/(\d+)/)[0])
        const price=parseInt(e.parentElement.parentElement.parentElement.children[3].textContent);
        totalamount=totalamount-(quantity*price);
        const qty=inputbox.children[0].value;
        const datas={
            username:username,
            product_id:product_id,
            quantity:qty
        }
        $.ajax({
            type:"POST",
            data:JSON.stringify(datas),
            url:'http://localhost:5000/updatequantity',
            success:function(msg){
                if(msg){
                    console.log(msg);
                }
                else{
                    console.log(err);
                }
            }
        });
            
        e.parentElement.parentElement.children[0].innerHTML='Qty:'+qty+`<i class="fas fa-caret-down">`
        inputbox.style.top=-40+"%";
        totalamount=totalamount+(price*parseInt(datas.quantity));
        document.getElementById('totalamount').innerHTML=totalamount
    })
}

function updatequantity1(e,username,product_id){
    var totalamount=parseInt(document.getElementById('totalamount').innerHTML);
    const quantity=parseInt(e.parentElement.parentElement.parentElement.children[2].children[0].textContent.match(/(\d+)/)[0])
    const price=parseInt(e.parentElement.parentElement.parentElement.children[3].textContent);
    totalamount=totalamount-(quantity*price);
    
    const datas={
        username:username,
        product_id:product_id,
        quantity:1
    }
    
    $.ajax({
        type:"POST",
        data:JSON.stringify(datas),
        url:'http://localhost:5000/updatequantity',
        success:function(msg){
            if(msg){
                console.log(msg);
            }
            else{
                console.log(err);
            }
        }
    });
    
    e.parentElement.parentElement.children[0].innerHTML='Qty:'+1+`<i class="fas fa-caret-down">`;
    totalamount=totalamount+(price*parseInt(datas.quantity));
    document.getElementById('totalamount').innerHTML=totalamount
}

function updatequantity2(e,username,product_id){
    var totalamount=parseInt(document.getElementById('totalamount').innerHTML);
    const quantity=parseInt(e.parentElement.parentElement.parentElement.children[2].children[0].textContent.match(/(\d+)/)[0])
    const price=parseInt(e.parentElement.parentElement.parentElement.children[3].textContent);
    totalamount=totalamount-(quantity*price);

    const datas={
        username:username,
        product_id:product_id,
        quantity:2
    }
    $.ajax({
        type:"POST",
        data:JSON.stringify(datas),
        url:'http://localhost:5000/updatequantity',
        success:function(msg){
            if(msg){
                console.log(msg);
            }
            else{
                console.log(err);
            }
        }
    });
    
    e.parentElement.parentElement.children[0].innerHTML='Qty:'+2+`<i class="fas fa-caret-down">`;
    totalamount=totalamount+(price*parseInt(datas.quantity));
    document.getElementById('totalamount').innerHTML=totalamount
}

document.querySelector('.purchase').addEventListener('click',()=>{
    console.log("ASd")
    alert("your order is placed")
})