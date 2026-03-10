import { useState } from "react"

export default function MsgBox({userName,textColor}) {

    let [isLiked,setIsLiked]= useState(false)

    let likeHandler=()=>{
        setIsLiked(!isLiked)
    }

     
    
    return (
        <div>
            <h1 >Hello <span style={{color:textColor}}>{userName}</span>!</h1>
            <p onClick={likeHandler}>{isLiked?<i class="fa-solid fa-heart"></i>:<i class="fa-regular fa-heart"></i>} </p>
        </div>
    )
}
