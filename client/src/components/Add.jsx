import React, {useEffect, useState} from 'react';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import "./styles/add.css";
import axios from 'axios';
import FileBase64 from "react-file-base64";
import { getVoiture, setClio, setVoiture } from '../services/LocalStorage';
import id from 'date-fns/esm/locale/id/index.js';

export default function Add() {
  
    const [nom, setnom] = useState("");
    const [type, settype] = useState("");
    const [description, setdescription] = useState("");
    const [prix, setprix] = useState("");
    const [nbPlace, setnbPlace] = useState("");
    const [getaround, setgetaround] = useState("");
    const [ouicar, setouicar] = useState("");
    const [img, setimg] = useState("");
    const [data, setdata] = useState([{
        description : "",
        getaround : "",
        ouicar : "",
        nom: "",
        prix : " ",
        nbPlace : "",
        _id: "",
        type : "",
         __v : "",
         image : "",
         id : ""
      }])
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/voiture/display").then((res) => setdata(res.data.cars))
    })

    const handleForm = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/voiture/send", {
            nom : nom,
            type: type,
            description : description,
            prix : prix,
            nbPlace : nbPlace,
            ouicar : ouicar,
            getaround : getaround,
            image : img, 
            id : data.length+1
        }).then((res) => {console.log(res);
                            setVoiture(nom,img);
                            NotificationManager.success("", "La voiture a bien été ajouté !", 3000)})
          .catch((err) => {console.log(err);
                            NotificationManager.error("", "Une erreur est survenue, veuillez réessayer", 3000)});
        e.target.reset();
    }
  
    return (
        
        <div className='container-add'>
        <NotificationContainer/>
        <div className="background-add">
            <div class="shape-add"></div>
            <div class="shape-add"></div>
        </div>
        
        <form onSubmit={handleForm} className='form-add'>
            <h1 className='add-title'>AJOUT DE VÉHICULE</h1>
                    <label className='label' for="name">Nom</label>
                    <input className='input'  onChange={(event) => {setnom(event.target.value)}} type="text"  id="name" placeholder="Entrer le nom du véhicule"/>
            
                    <label className='label' for="type">Type</label>
                        <input className='input'  onChange={(event) => {settype(event.target.value)}} type="text"  id="type" placeholder="Entrer le type du véhicule"/>
                    
                    <label className='label' for="description">Description</label>
                        <textarea className='input'  onChange={(event) => {setdescription(event.target.value)}} type="text" id="description" placeholder="Entrer la description du véhiule"/>

                    <label className='label' for="place">Nombre de place</label>
                     <input className='input'  onChange={(event) => {setnbPlace(event.target.value)}} type="number"  id="place" placeholder="Entrer le nombre de place du véhicule"/>

                    <label className='label' for="prix">Prix</label>
                        <input className='input'  onChange={(event) => {setprix(event.target.value)}} type="number"  id="prix" placeholder="Entrer le prix du véhicule à la journée"/>
                   
                    <label className='label' for="getaround">Lien Getaround</label>
                        <input className='input'  onChange={(event) => {setgetaround(event.target.value)}} type="text"  id="getaround" placeholder="Entrer le lien getaround"/>
                    
                    <label className='label'  for="ouicar">Lien Ouicar</label>
                    <input className='input'  onChange={(event) => {setouicar(event.target.value)}} type="text"  id="ouicar" placeholder="Entrer le lien ouicar"/>

                    <FileBase64 
                    multiple={false}
                    onDone={({base64}) => setimg(base64)} className='input'/>
                    
            <button type="submit" class="btn-submit">Submit</button>
        </form>
    </div>
    
      )

}
