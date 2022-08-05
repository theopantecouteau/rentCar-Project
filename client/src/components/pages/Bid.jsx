import React, { useEffect, useState, useRef } from 'react'
import axios from "axios";
import {ImCross} from "react-icons/im";
import {FcApproval} from "react-icons/fc";
import "../styles/bid.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Button } from '../Button';

export default function Bid() {

    const [mail, setMail] = useState("");
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState("");
    const form = useRef();
    const [data, setData] = useState([{
      _id : "",
      depart : "",
      retour : "",
      voiture: "",
      __v : 0
    }]);


    const getData = async () => {
      await axios.get("http://localhost:3000/api/resa/display")
             .then((res) => setData(res.data.resa))
             .then((res) => console.log(res.data.resa));
    }

    useEffect(() => {
      getData();
    }, [])

    const styleCross = {
      color : "red",
    }

    const getUser = async (idClient) => {
      console.log(idClient);
      const res = await axios.get("http://localhost:3000/api/auth/id", {params : {id : idClient}});
      console.log(res);
      setNom(await res.data.nom);
      setPrenom(await res.data.prenom);
      setMail(await res.data.mail);
    }

    const handleRefuse = (idClient, idResa) => {
        const user = getUser(idClient);
        NotificationManager.success("", "Vous avez refusé la réservation", 3000);
        axios.post("http://localhost:3000/api/mess/send", {
                from : "627120a1eac5c68baa023a37",
                to : idClient,
                message : "Malheureusement, le véhicule n'est pas disponible, veuillez nous excuser. L'équipe Easy'loc"
            });
        handleSubmit(idResa);
      };

    const handleAccept  = (idClient, idResa) => {
        const user = getUser(idClient);
        NotificationManager.success("", "Vous avez accepté la réservation", 3000);
        axios.post("http://localhost:3000/api/mess/send", {
                from : "627120a1eac5c68baa023a37",
                to : idClient,
                message : "Félicitations, votre réservation a été confirmé !"
            })
        handleSubmit(idResa);
    }

    const handleSubmit= (idResa) => {
      axios.delete("http://localhost:3000/api/resa/remove", {params : {id : idResa}});
      
    }
    

    


    const displayData =  data.map((resa)  => { 
                                              return (<tr key={resa._id}>
                                                      <td data-label="Date Départ">{resa.depart.split("T")[0]}</td>
                                                      <td data-label="Heure Départ" >{resa.heureDepart+"h"}</td>
                                                      <td data-label="Date Retour">{resa.retour.split("T")[0]}</td>
                                                      <td data-label="Heure Retour">{resa.heureRetour+"h"}</td>
                                                      <td data-label="Voiture">{resa.voiture}</td>
                                                      <td data-label="id">{resa.idClient}</td>
                                                      <td>
                                                        <Button buttonColor="blue" buttonSize="btn-medium" onClick={() => handleAccept(resa.idClient, resa._id)}>Accepter</Button><Button onClick={() => handleRefuse(resa.idClient, resa._id)} buttonColor="red" buttonSize="btn-medium">Refuser</Button>
                                                      </td>
                                                      </tr>
                                              )
                                              });

    return (
        <><NotificationContainer/>
        {data.length < 1 ? 
          <div className='table-container'>
              <p>Pas de réservations</p>
          </div>
             
          : 

        <div className='table-container'>
        <table class='events-table' >
          <thead>
          <tr>
          <th  class='event-date'>Date Départ</th>
          <th class='event-time'>Heure Départ</th>
          <th  class='event-date'>Date Retour</th>
          <th  class='event-time'>Heure Retour</th>
          <th  class='event-description'>Voiture</th>
          <th  class='event-description'>ID</th>
          </tr>
          </thead>

          <tbody>
            {displayData}
          </tbody>
          </table>
        </div>}
        </>);
}
