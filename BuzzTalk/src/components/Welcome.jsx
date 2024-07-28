import React from 'react'
import Logo from "../assets/react.svg"
import "./Welcome.css"
import wellcome from "../assets/WhiteColorfulMinimalistWelcomeChannelYoutubeIntro-ezgif.com-video-to-gif-converter.gif"

export default function Welcome({currentUser}) {
    console.log(currentUser)
  return (
    
    <div className='WellCome-box'>
        <img src={wellcome} alt="Logo" />
        <h1>
            Welcome, <span>{currentUser && currentUser.username}</span>
        </h1>
        <h3>
            Please select a chat to Start Messaging 
        </h3>
    </div>
  )
}
