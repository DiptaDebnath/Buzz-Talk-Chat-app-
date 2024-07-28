import React from 'react'
import { useState,useEffect } from 'react';
import Logo from "../assets/react.svg"
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import axios from 'axios';



export default function Login() {

    let [text, setText] = useState({username: "",password: ""});
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
   
   
    let handleSubmit = async(event) => {
        event.preventDefault();
        if(handleValidation()){
            let {username, password} = text
            let user = {username, password};
            const {data} =await axios.post("http://localhost:8080/auth/login",user);  
            if(data.success === false){
                toast.error(data.msg,toastOption);
            }
            if(data.success === true){
                localStorage.setItem("BuzzTalk-user",JSON.stringify(data.userObj));
                navigate("/");
                
            }
            
        }
    }

    let handleInputText = (event) => {
        setText((currtext) => {
            return { ...currtext, [event.target.name]: event.target.value };
        })
    }

    useEffect(()=>{
        if(localStorage.getItem('BuzzTalk-user')){
          navigate("/");
        }

    },[])


    let handleValidation = ()=>{
        let {username,password } = text

        if(username === ""){
            toast.error('Username is requied', toastOption);
            return false;
        }else if(password===""){
          toast.error('Password is required', toastOption);
          return false;
      }
      return true;

    }


    return (
        <div className='FormContainer'>
            <form onSubmit={handleSubmit} className='LoginForm'>
                <div className='brand'>
                    <img src={Logo} alt="Logo" />
                    <h1>BuzzTalk</h1>
                </div>
                <input className="Login-input" type="text" placeholder='Username' name='username' min="3"onChange={handleInputText} value={text.username} />
                <input className="Login-input" type="password" placeholder='Password' name='password' onChange={handleInputText} value={text.password} />
                <button  type="submit" className='Login_Button'>Login</button>
                <span className='Register'>
                    Don't have an account?  <Link to="/Register">Register</Link>
                </span>s
                
            </form>
            <ToastContainer />

        </div>
    )
}
