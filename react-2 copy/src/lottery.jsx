import { useState } from "react";

export default function Lottery() {
    const [arr, setArr] = useState([0, 0, 0]);
    let [sum, setSum] = useState(0);

     
      

    const generateToken=()=>{
        let newArr = []
        let tempSum=0
        for(let i=0;i<3;i++){
            newArr[i]=Math.floor(Math.random()*10)
             
            tempSum+=newArr[i]
        }
        setArr(newArr)
        setSum(tempSum)

        console.log(newArr)
        console.log(tempSum)
         
    }
        

    return(
        <div>
            <h1>Lottery</h1>
            <h3>Lottery ticket = {arr.join('')}</h3>


            <button onClick={generateToken}>Generate token</button>
            <h3>Sum of digits = {sum}</h3>
            {sum===15?<h2>Congratulations you won the lottery</h2>:<h2>Better luck next time</h2>}
        </div>
    )
}