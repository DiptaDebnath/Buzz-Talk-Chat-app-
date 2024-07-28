import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
import './ChatInput.css'

export default function ChatInput({ handleSendMessage }) {
    const [showEmojipicker,setShowEmojipicker] = useState(false)
    const [msg,setMsg] = useState("");

    const sendChat = (event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMessage(msg);
            setMsg("");
        }
    }

    const handleEmijiPicker = ()=>{
        setShowEmojipicker(!showEmojipicker)
    }
    
    const HandleEmojiClick = (event,emoji)=>{
        let massage = msg;
        massage = massage + event.emoji;
        setMsg(massage);
      
    }


    const handleMassage = (event)=>{
        setMsg(event.target.value)
    }


    return (
        <div className='ChatInput-container'>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmijiPicker}/>
                    {showEmojipicker && <Picker className='picker' onEmojiClick={HandleEmojiClick} style={{ position: 'absolute', top: '-450px', backgroundColor: "#080420", boxShadow:"0 5px 10px #9a86f3",borderColor: "#9a86f3" }} />}
                </div>
            </div>
            <form className='input-container' onSubmit={sendChat}>
                <input type="text" placeholder='Type your message here' className='type-box' value={msg} onChange={handleMassage} />
                <button className='chat-submit'>
                    <IoMdSend />
                </button>

            </form>
        </div>

    )
}
