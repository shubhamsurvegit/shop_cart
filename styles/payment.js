function getdetail(){
    const amount=document.getElementById('totalamount').innerHTML;
    const addresscontainer=document.querySelector('.address');
    const input1=addresscontainer.children[1].value;
    const input2=addresscontainer.children[2].value;
    const input3=addresscontainer.children[3].value;
    if(document.getElementById('cashondelivery').checked){
        alert("coming to you")
        const address={
            payment_method:"Offline with cash",
            address1:input1,
            address2:input2,
            address3:input3,
        }
        $.ajax({
            type:"POST",
            data:address,
            url:'http://localhost:5000/adddetail',
            success:function(msg){
                if(msg){
                    console.log(msg);
                }
                else{
                    console.log(err);
                }
            }
        });
    }
    else{
        const address={
            address1:input1,
            address2:input2,
            address3:input3,
        }
        $.ajax({
            type:"POST",
            data:address,
            url:'http://localhost:5000/adddetail',
            success:function(msg){
                if(msg){
                    console.log(msg);
                }
                else{
                    console.log(err);
                }
            }
        });
        window.location="http://localhost:5000/payment"
    }

}
