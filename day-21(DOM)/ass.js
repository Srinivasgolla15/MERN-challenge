let body= document.querySelector("body");
let btn=document.createElement("button");
btn.innerText="Click me!";
body.appendChild(btn);
let input=document.createElement("input");

input.placeholder="username";
body.appendChild(input);
btn.setAttribute("id", "btn");

btn.style.color="white";
btn.style.backgroundColor="blue";



