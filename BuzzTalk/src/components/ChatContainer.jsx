import React, { useEffect, useRef, useState } from 'react'
import "./ChatContainer.css"
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios'
import {v4 as uuidv4} from "uuid"

export default function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const scrollRef = useRef()
    const AllChat = async () => {
        if(currentChat){

            const { data } = await axios.post("http://localhost:8080/messages/getmsg", {
                from: currentUser._id,
                to: currentChat._id,
            });
            // console.log(data)
            setMessages(data);
        }

    }

    useEffect(() => {
        AllChat()
    }, [currentChat])

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                console.log(msg)
                setArrivalMessage({fromSelf:false,message:msg})
            })
        }
    },[socket]);

    useEffect(() => {
        console.log(arrivalMessage);
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
    


    useEffect(() => {
        // Scroll to the bottom of the chat messages container
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (msg) => {
        let { data } = await axios.post("http://localhost:8080/messages/addMessage", { from: currentUser._id, to: currentChat._id, message: msg })
        socket.current.emit("send-msg",{
            to: currentChat._id,
            from: currentUser._id,
            message:msg,
        })

        const msgs = [...messages];
        msgs.push({fromSelf:true, message:msg})
        console.log(msgs)
        setMessages(msgs);
    }
    return (
        <>
            {
                currentChat && (
                    <div className='ChatContainer'>
                        <div className="chat-header">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                                </div>
                                <div className="username">
                                    {currentChat.username}
                                </div>
                            </div>
                            <Logout currentUser={currentUser}/>
                        </div>
                        <div className="chat-messages">
                           {
                                messages.map((message, index) => (
                                    <div key={index} className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                        <div className="chat-content">
                                            <p>
                                                {message.message}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        <div ref={scrollRef} />
                        </div>
                        <ChatInput handleSendMessage={handleSendMessage} />
                    </div>
                )
            }
        </>

    )
}
