let btn=document.querySelector("button");
function getRandomColor() {
    let red=Math.floor(Math.random()*256);
    let green=Math.floor(Math.random()*256);
    let blue=Math.floor(Math.random()*256);
    return `rgb(${red}, ${green}, ${blue})`;
}

let text=document.querySelector("h1");
let container=document.querySelector(".color-display");

btn.addEventListener("click",function(){
    container.style.backgroundColor=getRandomColor();
    text.innerText=container.style.backgroundColor;
})

