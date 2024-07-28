import React, { useState, useEffect } from 'react'
import Logo from "../assets/react.svg"
import BuzzTalkLogo from "../assets/logo-1933884_640.webp";



import "./Contacts.css"
import { useNavigate } from 'react-router-dom'

export default function Contacts({ contacts, currentUser,changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)

  const navigate = useNavigate()
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage)
    }
  }, [currentUser]);

  const currentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  }

  return (
    <>
      {
        currentUserImage && currentUserName && (
          <div className='contacts-container'>
            <div className='brand'>
              <img className='logo' src={BuzzTalkLogo} alt="Logo" />
              <h3>BuzzTalk</h3>
            </div>
            <div className="contacts">
              {
                contacts.map((contact, index) => {
                  return (
                    <div className={`contact ${index === currentSelected ? "selected-contact" : ""}`} key={index}  onClick={() => {
                      currentChat(index,contact);

                    }}>
                      <div className="avatar">
                        <img className="contact-avavtarImage"src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                      </div>
                      <div className="username">
                        <h3>
                          {contact.username}
                        </h3>
                      </div>
                    </div>
                  )
                })}
       
            </div>
            <div className="current_user">
                <div className="avatar">
                        <img className="contact-avavtarImage" style={{cursor:"pointer"}} src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar" onClick={()=>{navigate("/profile")}}/>
                      </div>
                      <div className="username">
                        <h2>
                          {currentUser.username}
                        </h2>
                      </div>
                </div>

          </div>
        )
      } 
    </>
  )
}
