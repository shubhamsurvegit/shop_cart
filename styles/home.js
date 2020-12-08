const football=document.querySelector(".football")
const jersey=document.querySelector(".jersey")
const studs=document.querySelector(".studs")
const stockings=document.querySelector(".stockings")
const shin=document.querySelector(".shin")
const searchres=document.getElementById("searchres");



searchres.addEventListener("change",()=>{
    if(searchres.value=="Football"){
        jersey.style.display="none";
        studs.style.display="none";
        stockings.style.display="none";
        shin.style.display="none";
        football.style.display="grid";
    }
    else if(searchres.value=="Jersey"){
        football.style.display="none";
        studs.style.display="none";
        stockings.style.display="none";
        shin.style.display="none";
        jersey.style.display="grid";
    }
    else if(searchres.value=="Studs"){
        football.style.display="none";
        jersey.style.display="none";
        stockings.style.display="none";
        shin.style.display="none";
        studs.style.display="grid";
    }
    else if(searchres.value=="Stockings"){
        football.style.display="none";
        jersey.style.display="none";
        studs.style.display="none";
        shin.style.display="none";
        stockings.style.display="grid";
    }
    else{
        football.style.display="none";
        jersey.style.display="none";
        studs.style.display="none";
        stockings.style.display="none";
        shin.style.display="grid";
    }
})


function add(e,username){
    e.style.backgroundColor="orange";
    e.style.backgroundColor="#f2f2f2";
    const size=e.parentElement.children[4].value;
    if(size){
        const product={
            id:e.parentElement.children[1].textContent,
            img:e.parentElement.children[0].src,
            name:e.parentElement.children[2].textContent,
            size:size,
            quantity:1,
            price:e.parentElement.children[3].textContent
        }
        if(username){
            $.ajax({
                type:"POST",
                data:JSON.stringify(product),
                url:'http://localhost:5000/add',
                success:function(msg){
                    if(msg){
                        console.log("AD")
                    }else{
                        alert("Server error")
                    }
                }
            });
            document.getElementById('alertmsg').style.top=(e.offsetTop-1200)+"px";
            setInterval(()=>{
                    document.getElementById('alertmsg').style.top="-1000px";
            },2000);
        }
        else{
            alert('Kindly Login');
        }      
    }
    else{
        alert('Select size');
    }
    

}

