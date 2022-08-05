import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserId, removeItem, removeUser, removeMail, removeName, removeAdmin} from '../../services/LocalStorage';
import "../styles/dashboard.css";
import {Button} from "../Button.jsx";
import { isAuthentifacted } from '../../services/AuthApi';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Dashboard() {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [mail, setMail] = useState("");
  const navigation = useNavigate();  

     const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    const request = async () =>{ 
      const res = await axios.get("http://localhost:3000/api/auth/id", {params : {id : getUserId('user')}})
      setNom(await res.data.nom);
      setPrenom(await res.data.prenom);
      setMail(await res.data.mail);
      setEmail(await res.data.email);
      setTelephone(await res.data.telephone);
      console.log(await res.data);
    }

    useEffect(() => {
      request();
    }, [2000])

    const changeAccount = (e) => {
        e.preventDefault();
        
        const userId = getUserId('user');
        axios.put("http://localhost:3000/api/auth/id", {
          id: userId,
          nom : nom,
          prenom : prenom,
          mail: mail,
          email : mail,
          telephone : telephone
        }).then((res) => NotificationManager.success("", "Vos informations ont bien été modifiées !", 3000))
          .catch((err) => NotificationManager.error("", "Une erreur est survenue, veuillez réessayer !"))
    }

    const closeAccount = () => {
      const userId = getUserId('user');
      console.log(userId)
      axios.delete("http://localhost:3000/api/auth/remove", {params : {id : userId}}).then((res) => NotificationManager.success("", "Votre compte a bien été fermé !", 3000))
                                                                                     .catch((err) => NotificationManager.error("", "Une erreur est survenue, veuillez réessayer"))
      isAuthentifacted(false);
      navigation.redirect('/');

    }

  return (
    
    <div className='container-dashboard'>
      <NotificationContainer/>
      <h1>Mon Compte</h1>
      <div className='center-button'>
      <form className='dashboard-form'>
      <h3>Mes Informations personnelles</h3>
        <label className='label' htmlFor='nom' >Nom</label>
        <input className='input' value={nom} onChange={(e) => setNom(e.target.value)} id="nom"></input>
        <label  className='label' htmlFor='prenom'>Prénom</label>
        <input className='input' value={prenom} onChange={(e) => setPrenom(e.target.value)} id="prenom"></input>
        <label  className='label' htmlFor='telephone'>Téléphone</label>
        <input className='input' value={telephone} onChange={(e) => setTelephone(e.target.value)} id="telephone"></input>
        <label  className='label' htmlFor='mail'>Mail</label>
        <input className='input' value={mail} onChange={(e) => setMail(e.target.value)} id="mail"></input>
        <button className='btn-submit' onClick={changeAccount}>Modifier</button>
      </form>
      <Button className="btn-close" onClick={closeAccount} buttonSize="bt--large" buttonColor="red">Fermer mon compte</Button>
      </div>
    </div>
  )
}
