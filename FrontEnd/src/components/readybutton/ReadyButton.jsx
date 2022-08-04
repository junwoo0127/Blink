import React, {useState} from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:4000");

function ReadyButton(){
    const [count, setCount] = useState(0);
    const [disable, setDisable] = useState(false)
    
    
    const onClick = (e) => {
        e.preventDefault();
        socket.emit("getReady")
        console.log("clicked")
        socket.on("getStart", (cnt)=> {
            setCount(cnt.count)
            console.log()

        })
        setDisable(true)
    }
   

    return(
        <button onClick={onClick} disabled={disable}>참가자 수 : {count}</button>
    )
}

export default ReadyButton;