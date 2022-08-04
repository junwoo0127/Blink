import React, {useState} from "react";

import "./GameRoom.css"

import StreamComponent from "../../stream/StreamComponent";
function GameRoom(props){

    //variables
    const localUser = props.localUser;
    
    //function
    
   const setMode = (mode) => {
       props.setMode(mode)
   }
    return (
      
        <>
        {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div className="OT_root OT_publisher custom-class" id="localUser">
                <StreamComponent
                  user={localUser}
                  
                />
              </div>
            )}
          {props.subscribers.map((sub, i) => (
            <div
              key={i}
              className="OT_root OT_publisher custom-class"
              id="remoteUsers"
            >
            
              <StreamComponent
                
                user={sub}
                streamId={sub.streamManager.stream.streamId}
                
                mode= {setMode}
              />
            </div>
          ))}
          
            
        </>

    );
  }

  
export default GameRoom;
