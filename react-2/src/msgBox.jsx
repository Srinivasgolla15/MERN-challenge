export default function MsgBox({userName,textColor}) {
    return (
        <div>
            <h1 >Hello <span style={{color:textColor}}>{userName}</span>!</h1>
        </div>
    )
}