import ".././styles/contact.css";
import React, { useRef } from 'react';
import emailjs from "emailjs-com";
import { useState } from "react";
import Alert from "../Alert";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Contact() {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_6vb8d5j', 'template_4my5wpf', form.current, 'm3AMzuZXZIkGDxQgo')
      .then((result) => {
          NotificationManager.success("", "Le message a bien été envoyé !", 3000);
          
      }, (error) => {
          NotificationManager.error("", "Une erreur est survenue, veuillez réessayer !", 3000);
      });
      e.target.reset();
  };

  return (
    <div className='container-contact'>
      <NotificationContainer/>
    <div className="background-contact">
        <div class="shape-contact"></div>
        <div class="shape-contact"></div>
    </div>
    <form  ref={form}  onSubmit={sendEmail} className='form-contact'>
            <h1>CONTACTEZ-NOUS</h1>
                <label  className="label"  for="mail">Mail</label>
                <input className='input' type="email" id="mail" placeholder="Mail" name="reply_to"/>
                <label className='label' for="name" >Nom</label>
                <input className='input' type="text" id="name" placeholder="Nom" name="from_name"/>
                <label className='label' for="message">Message</label>
                <textarea className='textarea' for="message" id="message" placeholder='Entrer votre message' name="message"></textarea>
            <button type="submit" class="btn-submit">Submit</button>
    </form>
    </div>
  )
}
