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

let h1=document.createElement("h1");
body.appendChild(h1);
h1.innerHTML="<u>DOM Practice</u>";
h1.style.color="purple";

let p=document.createElement("p");
p.innerText="Apna college sigma prime practice"
body.appendChild(p);
p.style.fontWeight="bold";



