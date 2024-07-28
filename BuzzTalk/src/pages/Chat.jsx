import React, { useMemo } from 'react'
import "./Chat.css"
import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'

export default function Chat() {
  const socket = useRef();



  const[contacts,setContacts] = useState([]);
  const[currentUser,setCurrentUser] = useState(undefined);
  const[currentChat , setCurrentChat] = useState(undefined)
  let navigate = useNavigate();




  useEffect(()=>{
    findCurrentUser()
  },[])

  useEffect(()=>{
    if(currentUser){
      socket.current = io("http://localhost:8080")
      socket.current.on("connect", () => {
        console.log("Socket connected with ID:", socket.current.id);
      });
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser])
  // const socket = useMemo(()=>{
  //   return io("http://localhost:8080")
  // },[currentUser])


  // socket.emit("message" , "i am pro");


  useEffect(()=>{
    allUsers()
  },[currentUser])

  let findCurrentUser =  async()=>{
    if(!localStorage.getItem('BuzzTalk-user')){
      navigate("/login");
    }else{
      let user = await JSON.parse(localStorage.getItem('BuzzTalk-user'));
      setCurrentUser(user);
    }
  }

  let handleChatChange=(chat)=>{
    setCurrentChat(chat)
  }


  let allUsers = async()=>{
    if(currentUser){
      if(currentUser.isAvatarImageSet){
        const {data} = await axios.get(`http://localhost:8080/auth/allusers/${currentUser._id}`) 
        setContacts(data);
        // console.log(contacts);
      }else{
        navigate("/setAvatar");
      }
    }

  
  }
  



  return (
    <div className='full_chat_container'>
      <div className="Chat_container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
          
          {
            currentChat === undefined?( <Welcome currentUser={currentUser} /> ):(<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
          }
          
      </div>

    </div>
  )
}
