const socket=io();


socket.on('message',(message)=>{
    console.log(message)
})


function fun(e){
    const id=e.parentElement.parentElement.children[0].children[0].innerHTML
    const data={
        id:id,
        status:e.value
    }
    socket.emit("msg",data)
    fetch("/change_status_admin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    })
    .catch((err) => console.log(err))
}


socket.on('toclient',(msg)=>{
    console.log(msg)
})