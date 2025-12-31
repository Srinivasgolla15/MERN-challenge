let body = document.querySelector("body");
let btn=document.createElement("button");
body.appendChild(btn);
btn.innerText="Clikc me!";
btn.addEventListener("click",function(){
    body.style.backgroundColor="green";
})