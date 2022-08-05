import React, { useEffect, useState, useContext } from 'react'
import './styles/login.css';
import 'bootstrap'
import axios from 'axios';
import { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import Auth from '../contexts/Auth';
import { login } from '../services/AuthApi';
import {  setUserId} from '../services/LocalStorage';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Admin from '../contexts/Admin';

export default function Login() {

    const userRef = useRef(null);
    const [mail, setMail] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();
    const {isAuth, setAuth} = useContext(Auth);
    const {isAdmin, setAdmin} = useContext(Admin);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await login(mail, pwd);
            console.log(response);
            navigate('/');
            setAuth(true);
            axios.get("http://localhost:3000/api/auth/id", {params : {id : response.userId}})
                 .then((res) =>{
                                    setUserId('user',res.data._id);
                                    setAdmin(res.data.admin);
                            });
        }catch (response) {
            NotificationManager.error("", "Mot de passe ou mail incorrect", 3000);
            console.log(response);
        }
    }
    

  return (
      <>
    <NotificationContainer/>
    <div className='container-login'>
      
        <div className="background-login">
            <div class="shape-login"></div>
            <div class="shape-login"></div>
        </div>
        <form onSubmit={handleSubmit} className='form-login'>
            <h1>CONNEXION</h1>
                <label  className="label" for="exampleInputEmail1">Mail</label>
                <input ref={userRef} className='input' onChange={(event) => {setMail(event.target.value)}} type="email" id="exampleInputEmail1" placeholder="Email" required value={mail}/>
                <label  className='label' for="exampleInputPassword1">Mot de passe</label>
                <input ref={userRef} className='input' onChange={(event) => {setPwd(event.target.value)}} type="password" id="exampleInputPassword1" placeholder="Password" required value={pwd}/>
            <button type="submit" class="btn-submit">Se connecter</button>
            
        </form>
    </div>
    </>
    
  )
}
