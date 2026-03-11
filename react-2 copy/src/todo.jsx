import { useState } from "react"
export default function TodoList() {
    let [todo,setTodo]=useState(["Go to Gym","Buy Groceries","Learn React"])
    let [newTodo,setNewTodo]=useState("")

    let addTodo=()=>{
        setTodo([...todo,newTodo])
        setNewTodo("")
    }
   return (
    <div>
   <h1 className="todo">Todo List</h1>
    <div className="todoList">
        <input type="text" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} />

        <button onClick={addTodo}>Add</button>
        <ul>
            {todo.map((item,index)=><li key={index}>{item}</li>)}
        </ul>
    </div>
    </div>

)
}