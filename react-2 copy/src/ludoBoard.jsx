import { useState } from "react"


export default function LudoBoard() {
    let [moveCount,setMoveCount]=useState({
    blue:0,
    yellow:0,
    green:0,
    red:0
})

    return (
        <div>
            <h1>Ludo Board</h1>
            <div className="board">
            <p>Blue Player = {moveCount.blue}</p>
            <button onClick={() => setMoveCount({...moveCount, blue: moveCount.blue + 1})}>+1</button>
            <p>Yellow Player = {moveCount.yellow}</p>
            <button onClick={() => setMoveCount({...moveCount, yellow: moveCount.yellow + 1})}>+1</button>
            <p>Green Player = {moveCount.green}</p>
            <button onClick={() => setMoveCount({...moveCount, green: moveCount.green + 1})}>+1</button>
            <p>Red Player = {moveCount.red}</p>
            <button onClick={() => setMoveCount({...moveCount, red: moveCount.red + 1})}>+1</button>
            </div>

        </div>
    )
}
