const socket=io();
socket.on('message',(message)=>{
    console.log(message)
})

socket.on('toclient',(message)=>{
    const ul=document.querySelector("#ul");
    console.log(ul.children[1])
    if(message.status=="Confirmed"){
        ul.children[0].style.color="green"
        ul.children[1].style.color="green"
    }
    else if(message.status=="Shipped"){
        ul.children[0].style.color="green"
        ul.children[1].style.color="green"
        ul.children[2].style.color="green"
    }
    else if(message.status=="Out For Delivery"){
        ul.children[0].style.color="green"
        ul.children[1].style.color="green"
        ul.children[2].style.color="green"
        ul.children[3].style.color="green"
    }
    else if(message.status=="Delivered"){
        ul.children[0].style.color="green"
        ul.children[1].style.color="green"
        ul.children[2].style.color="green"
        ul.children[3].style.color="green"
        ul.children[4].style.color="green"
    }
    else{
        ul.children[1].style.color="green"
    }
    fetch("/change_status", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    })
    .catch((err) => console.log(err))


})