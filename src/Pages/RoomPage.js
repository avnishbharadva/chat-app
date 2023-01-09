import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React from 'react'
import { useParams } from 'react-router-dom'

const RoomPage = () => {

  const { roomId } = useParams();

  const myCall = async (element) => {
    const appID = 553506930;
    const serverSecret = "f0b4ff0a481862a8a053d74f98ea126b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID, 
        serverSecret, 
        roomId,
        Date.now().toString(),    // User Authentication
        "Your Name",
        );
    
    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
        container: element,
        scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall
        },
        sharedLinks : [
            {
                name: "Copy Link",
                url: `http://localhost:3000/room/${roomId} 
                      Enter Room ID : ${roomId}`,
                // https://aviis-video-call-app.netlify.app/room/first777
            },
        ],
        // showScreenSharingButton : true,
    })
  }

  return (
    <>
    <div>
        <div ref={myCall} style={{ width: '100vw', height: '100vh' }} />
    </div>    
    </>
  )
}

export default RoomPage