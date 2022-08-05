import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getUserId } from '../../services/LocalStorage';
import "../styles/ask.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Ask() {
    const [depart, setDepart] = useState("");
    const [retour, setRetour] = useState("");
    const [heureDepart, setHeureDepart] = useState("");
    const [heureRetour, setHeureRetour] = useState("");
    const [className, setClassName] = useState("");
    const [date, setDate] = useState("");
    const [voiture, setVoiture] = useState([{
        description : "",
        getaround : "",
        id : "",
        nbPlace: "",
        nom : "",
        ouicar : "",
        prix: "",
        type: ""
      }]);
      
    const [currentVoiture, setCurrentVoiture] = useState("");

    useEffect(() => {
        setDate(new Date().toISOString().split('T')[0]);
        axios.get("http://localhost:3002/cars").then((response) => { setVoiture([...response.data]);})
    }, 100000);

    const displayOption = voiture.map((voiture) => {
        return <option key={voiture.id} value={voiture.nom}>{voiture.nom}</option> 
    });

    const handleReservation = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/resa/save", {
            depart : depart,
            retour : retour,
            heureDepart : heureDepart,
            heureRetour : heureRetour,
            voiture: currentVoiture,
            idClient : getUserId('user')
        })
        .then((res) => {  console.log(res);
                          NotificationManager.success("", "La demande de réservation a bien été envoyée !", 3000);})
        .catch((err) => {
              NotificationManager.error("", "La réservation n'a pas fonctionnée, veuillez réessayer.", 3000);
        })
    }

    console.log(date);

   return (
    <div className='container-ask'>
      
        <div className="background-ask">
            <div class="shape-ask"></div>
            <div class="shape-ask"></div>
        </div>
        <NotificationContainer/>
        <form onSubmit={handleReservation} className='form-ask'>
            <h1 className='ask-title'>DEMANDE DE RÉSERVATION</h1>
                    <label className='label' for="depart">Départ</label>
                    <input className='input' min={date}  onChange={(event) => {setDepart(event.target.value); setDate(event.target.value)}} type="date"  id="depart" placeholder="Sélectionner une date de départ"/>
            
                    <label className='label' htmlFor='heureDepart'>Heure de Départ</label>
                    <input className='input' min="0" onChange={(event) => setHeureDepart(event.target.value)} type="number" id='heureDepart' placeholder='Entrer une heure de départ'></input>

                    <label className='label' for="retour">Retour</label>
                    <input className='input' min={date}  onChange={(event) => {setRetour(event.target.value)}} type="date"  id="retour" placeholder="Sélectionner une date retour"/>
                    
                    <label className='label' htmlFor='heureRetour'>Heure de Retour</label>
                    <input className='input'  min="0" onChange={(event) => setHeureRetour(event.target.value)} type="number" id='heureRetour' placeholder='Entrer une heure de retour'></input>

                    <label className='label' for="voiture">Voiture</label>
                        <select className='input select'  onChange={(event) => {setCurrentVoiture(event.target.value)}} type="select" id="voiture" placeholder="Sélectionner une voiture">
                        <option>Choisissez une voiture</option>
                        {displayOption}</select>
            <button type="submit" class="btn-submit">Submit</button>
            <p className=''></p>
        </form>
    </div>
  )
}
