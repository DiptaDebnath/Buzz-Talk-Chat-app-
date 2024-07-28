import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import axios from 'axios';
import { FaArrowAltCircleLeft } from "react-icons/fa";




export default function Profile() {
    const [currentUser, setCurrentUser] = useState(undefined);
    let [text, setText] = useState({ username: "", email: "" });
    const navigate = useNavigate();

    let toastOption = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    }


    let handleValidation = () => {
        let { username, email } = text

        if (username.length < 3) {
            toast.error('Uername is to short', toastOption);
            return false;
        } else if (email === "") {
            toast.error('Email is requird', toastOption);
            return false;
        }
        return true;

    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        handleValidation();

    }



    useEffect(() => {
        setUser();
    }, [])

    let setUser = async () => {
        let user = await JSON.parse(localStorage.getItem("BuzzTalk-user"));
        setCurrentUser(user)

    }
    useEffect(() => {
        if (currentUser) {
            setText({
                username: currentUser.username,
                email: currentUser.email
            });
        }
    }, [currentUser])


    // let handleInputText = (event) => {
    //     setText((currtext) => {
    //         return { ...currtext, [event.target.name]: event.target.value };
    //     })
    // }


    return (
        <>
            <div className='full_profile_container'>
                <div className="profile_container">
                    {currentUser ? (
                        <>

                            <div className='profile-pic'>
                                <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar" />
                                <button className='icon' type='button' onClick={()=>{navigate("/")}}>
                                <FaArrowAltCircleLeft  style={{fontSize: '2em' }}/>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='profile-details'>

                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input className='Register-input' id="username" type="text" placeholder='Username' name='username' value={text.username} />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input className='Register-input' id="email" type="email" placeholder='Email' name='email'  value={text.email} />
                                    </div>


                                </div>
                            </form>
                        </>

                    ) : (
                        <div>Loading...</div>
                    )}

                </div>
            </div>
            <ToastContainer/>
        </>
    )
}
