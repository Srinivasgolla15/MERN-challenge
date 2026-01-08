let todoInput = document.querySelector("input");
let list = document.querySelector("ul");
let btn = document.querySelector("button");

// todoInput.addEventListener("input",function(event) {
//     console.log(event.value);
   
// })

 btn.addEventListener("click",function() {
        let li=document.createElement("li");
        li.innerText=todoInput.value;
        list.appendChild(li);
        todoInput.value="";
        let del_btn =document.createElement("button");
        del_btn.innerText="delete";
        del_btn.className="delete-btn";
        li.appendChild(del_btn);
    });
// let delete_btn = document.querySelector(".delete-btn");

list.addEventListener("click",function(event){
    if (event.target.className =="delete-btn"){
        list.removeChild(event.target.parentElement);
    }
})