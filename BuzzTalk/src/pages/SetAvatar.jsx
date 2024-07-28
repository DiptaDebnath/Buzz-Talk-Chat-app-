import React, { useEffect } from 'react'
import { useState } from 'react';
import Logo from "../assets/react.svg"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import axios from 'axios';
import { Buffer } from 'buffer';
import "./SetAvatar.css"
import { Hourglass } from 'react-loader-spinner'

export default function SetAvatar() {
    const api = "https://api.multiavatar.com";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);


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


    useEffect(()=>{
        if(!localStorage.getItem('BuzzTalk-user')){
          navigate("/login");
        }

    },[])

    const setProfilePic = async () => {
        if (selectedAvatar === undefined) {
            toast.error('You have to select avatar first', toastOption);
        } else {
            const user = await JSON.parse(localStorage.getItem('BuzzTalk-user'));
            const { data } = await axios.post(`http://localhost:8080/auth/setAvatar`, {
                _id: user._id,
                avatarImage: avatars[selectedAvatar],
            })
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.avatarImage;
                localStorage.setItem('BuzzTalk-user',JSON.stringify(user));
                navigate("/");
            }else{
                toast.error("Error setting avatar.please try again",toastOption);
            }

        }
    }

    const handleAvatar = async () => {
        try {
            const data = []
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.floor(Math.random() * 1000)}`)
                const buffer = new Buffer.from(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching avatar:', error);
            toast.error('Failed to load avatar. Please try again later.', toastOption);
        }

    }

    useEffect(() => {
        handleAvatar()
    }, []);

    return (
        <div className='container'>
            {
                isLoading ? (
                    <Hourglass
                        visible={true}
                        height="100"
                        width="100"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#306cce', '#72a1ed']}
                    />
                ) : (
                    <>
                        <div className='title-container'>
                            <h1>Pick avatar as your profile picture</h1>
                        </div>
                        <div className="avatars">{avatars.map((avatar, index) => {
                            return (
                                <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => {
                                        setSelectedAvatar(index)

                                    }} />
                                </div>
                            )
                        })}</div>
                        <button className='set-pic-button' onClick={setProfilePic}>Set as profile picture</button>
                    </>
                )
            }
            <ToastContainer />
        </div>

    )
}
