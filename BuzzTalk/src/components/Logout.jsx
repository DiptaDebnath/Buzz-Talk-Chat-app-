import React from 'react'
import "./Logout.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {BiPowerOff} from 'react-icons/bi'

export default function Logout({currentUser}) {
    const navigate = useNavigate()
    const handleClick = async()=>{
        console.log(currentUser.username)
        const {data} = await axios.post("http://localhost:8080/auth/logout",{ username: currentUser.username }) 
        localStorage.clear();
        navigate("./login")
    }
  return (
    <button className='logOut-button' onClick={handleClick}>
        <BiPowerOff/>
    </button>
  )
}
