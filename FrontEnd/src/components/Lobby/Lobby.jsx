import React from 'react'
import useScript from "../common/useScript";
import '../webComponent/openvidu-webcomponent-2.22.0.css'
function Lobby(){
    useScript("../webComponent/openvidu-webcomponent-2.22.0.js");

    let webComponent = document.querySelector('openvidu-webcomponent');


    return(
    <div>
    <openvidu-webcomponent style="height: 100%;"/>
    </div>
    )
}

export default Lobby;