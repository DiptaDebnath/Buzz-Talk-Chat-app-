import React from 'react'
import { useState,useEffect } from 'react';
import Logo from "../assets/react.svg"
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import axios from 'axios';



export default function Register() {

    let [text, setText] = useState({username: "", email: "",password: "",confirmPassword:"" });
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
            let {username, email,password} = text
            let user = {username, email,password};
            const {data} =await axios.post("http://localhost:8080/auth/register",user);  
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
        let {username, email,password,confirmPassword } = text

        if(password!==confirmPassword){
            toast.error('Password and confirm password should be same', toastOption);
            return false;
        }else if(password < 8){
            toast.error('Password should be atleast 8 caracter or greater', toastOption);
            return false;
        }else if(username.length < 3){
            toast.error('Uername is to short', toastOption);
            return false;
        }else if(email === "" ){
            toast.error('Email is requird', toastOption);
            return false;
        }
        return true;

    }


    return (
        <div className='FormContainer'>
            <form onSubmit={handleSubmit} className='RegisterForm'>
                <div className='brand'>
                    <img src={Logo} alt="Logo" />
                    <h1>BuzzTalk</h1>
                </div>
                <input className='Register-input' type="text" placeholder='Username' name='username' onChange={handleInputText} value={text.username} />
                <input className='Register-input' type="email" placeholder='Email' name='email' onChange={handleInputText}  value={text.email}/>
                <input className='Register-input' type="password" placeholder='Password' name='password' onChange={handleInputText} value={text.password} />
                <input className='Register-input' type="password" placeholder='Confirm Password' name='confirmPassword' onChange={handleInputText} value={text.confirmPassword} />
                <button type="submit" className='Register_Button'>Create User</button>
                <span className='register-login'>
                    Already have an Account?  <Link to="/Login">Login</Link>
                </span>
                
            </form>
            <ToastContainer />

        </div>
    )
}
