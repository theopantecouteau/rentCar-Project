import axios from 'axios';
import React, { useState } from 'react';
import "./styles/suscribe.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Suscribe() {

    const [nom, setName] =useState("");
    const [prenom, setFirstname] = useState("");
    const [telephone, setPhone] = useState("");
    const [email, setMail]= useState("");
    const [email2, setMail2] = useState("");
    const [password, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");

    const handleForm = (e) => {
        e.preventDefault();
        if (password !== pwd2){
            NotificationManager.warning("", "Les mots de passe ne correspondent pas", 3000);
        }
        else if (password.length <6 ){
            NotificationManager.warning("","Le mot de passe doit contenir au minimum 6 caractères",3000);
        }
        else if (email != email2){
            NotificationManager.warning("", "Les emails ne correspondent pas", 3000);
        }
        else{  
                axios.post("http://localhost:3000/api/auth/signup", {
                nom : nom,
                prenom :prenom,
                telephone : telephone,
                email: email,
                password : password,
            }).then(() =>  NotificationManager.success("", "Vous êtes bien inscrit !", 3000) )
              .catch((err) => NotificationManager.error("", "L'adresse mail est utilisée", 3000));
        }
   
    }

  return (
    
    <div className='container-suscribe'>
        <NotificationContainer/>
        <div className="background-suscribe">
            <div class="shape-suscribe"></div>
            <div class="shape-suscribe"></div>
        </div>
        
        <form onSubmit={handleForm} className='form-suscribe'>
            <h1 className='suscribe-title'>INSCRIPTION</h1>
            <h3 className='suscribe-subtitle'>Inscrivez-vous afin de pouvoir réserver une voiture et de bénéficier d'offres promotionnelles </h3>
                    
                    <label className='label' for="name">Nom</label>
                    <input className='input'  onChange={(event) => {setName(event.target.value)}} type="text"  id="name" placeholder="Entrer votre nom"/>
            
                    <label className='label' for="firstname">Prénom</label>
                        <input className='input'  onChange={(event) => {setFirstname(event.target.value)}} type="text"  id="firstname" placeholder="Entrer votre prénom"/>
                    
                    <label className='label' for="phone">Téléphone</label>
                        <input className='input'  onChange={(event) => {setPhone(event.target.value)}} type="text" id="phone" placeholder="Entrer votre numéro de téléphone"/>
                   
                    <label className='label' for="mail">Mail</label>
                        <input className='input'  onChange={(event) => {setMail(event.target.value)}} type="mail"  id="mail" placeholder="Entrer votre mail"/>

                    <label className='label' for="mail2">Confirmer Mail</label>
                        <input className='input'  onChange={(event) => {setMail2(event.target.value)}} type="mail"  id="mail2" placeholder="Répéter le mail"/>
                   
                    <label className='label' for="pwd">Mot de passe</label>
                        <input className='input'  onChange={(event) => {setPwd(event.target.value)}} type="password"  id="pwd" placeholder="Entrer un mot de passe"/>
                    
                    <label className='label'  for="pwd2">Confirmer mot de passe</label>
                    <input className='input'  onChange={(event) => {setPwd2(event.target.value)}} type="password"  id="pwd2" placeholder="Répéter le mot de passe"/>
            <button type="submit" class="btn-submit">Submit</button>
        </form>
    </div>
  )
}
