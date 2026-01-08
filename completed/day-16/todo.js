let todo=[];
let req=prompt("What would you like to do?");
while(req!="quit"){
    if(req=="list"){
        console.log(todo);
        // break;
    }
    if(req=="add"){
        let item =prompt("Enter the item to add:");
        todo.push(item);
        console.log("Added",item)
        console.log(todo);
    }else if(req=="delete"){
        let del=prompt("Enter the item you need to delete: ");
        todo.splice(todo.indexOf(del),1);
        console.log(todo);
    }

    req=prompt("What would you like to do?");
}
