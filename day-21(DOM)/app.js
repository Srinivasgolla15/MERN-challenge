let body=document.querySelector("body");
let p= document.createElement("p");
body.appendChild(p);
p.innerText="hey I'm red!";
p.style.color="red";

let h3=document.createElement("h3");
h3.style.color="blue";
body.appendChild(h3);
h3.innerText="I'm a blue h3!";

let div1=document.createElement("div");
body.appendChild(div1);
div1.style.border="1px solid black";
div1.style.backgroundColor="pink";
let h1=document.createElement("h1");
div1.appendChild(h1);
h1.innerText="I'm in a div";
let p1=document.createElement("p");
div1.appendChild(p1);
p1.innerText="ME TOO!";
