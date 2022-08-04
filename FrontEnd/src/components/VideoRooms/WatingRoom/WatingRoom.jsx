import React from "react";

import "./WaitingRoom.css"

import StreamComponent from "../../stream/StreamComponent";




function WaitingRoom(props){

    const localUser = props.localUser;
    
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
              />
            </div>
          ))}
          
            
        </>

    );
  }

  
export default WaitingRoom;
