import Calendar from 'react-calendar';
import React, {useState, useEffect, useContext} from "react";
import "./styles/calendrier.css";
import axios from "axios";
import { Button } from './Button';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays, getDate } from 'date-fns';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { getUserId } from '../services/LocalStorage';
import Auth from '../contexts/Auth';
import {gsap} from "gsap";




function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

function differenceBetweenDays(a,b) {
  return differenceInCalendarDays(a,b);
}

function Calendrier() {

  const {isAuth, setAuth} = useContext(Auth);
  const [selectedDepart, setSelectedDepart] = useState(new Date());
  const [selectedRetour,setSelectedRetour] = useState(new Date());
  const [heureDepart, setHeureDepart] = useState("");
  const [heureRetour, setHeureRetour] = useState("");
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(null);
  const [oldPrice, setOldPrice] = useState(null);
  const [reduction, setReduction] = useState(null);
  const [display, setDisplay] = useState(false);
  const [currentVoiture, setCurrentVoiture] = useState("Renault Clio");
  const [resa, setResa] = useState([{
    depart : "",
    heureDepart : "",
    heureRetour : "",
    idClient : "",
    retour : "",
    voiture : "",
    __v : "",
    _id : ""  
  }]);

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

  

  useEffect(  () => {
    async function getData() {
      await axios.get("http://localhost:3000/api/voiture/display").then((response) => { setVoiture([...response.data.cars]);
      axios.get("http://localhost:3000/api/resa/display").then((response)=> setResa([...response.data.resa]))});
    }
    getData();
  }, []);

  const displayOption = voiture.map((voiture) => {
    return <option key={voiture.id}>{voiture.nom}</option> 
})

const handleVoiture = (event) => {setCurrentVoiture(document.getElementById("selected-voiture").value);
                                  
                                  }
const handleDisabled = () => {
  let res = new Array();
    for (let i=0; i<resa.length; i++){
      if (resa[i].voiture == currentVoiture){
        let from = new Date(resa[i].depart);
        from = new Date(from.setDate(from.getDate()-1));
        let to = new Date(resa[i].retour);
        to = new Date(to.setDate(to.getDate()-1))
        while (from <= to ) {
          res.push(from.valueOf());
          from = new Date(from.setDate(from.getDate() + 1));
        } 
      }
    }
  return res;
}

const handleRange = () => {
  let res = new Array();
  let from = new Date(selectedDepart.setDate(selectedDepart.getDate()-1));
  let to = new Date(selectedRetour.setDate(selectedRetour.getDate()-1));
  while (from <= to){
    res.push(from.valueOf());
    from = new Date(from.setDate(from.getDate()+1))
  }
  let resDisabled = handleDisabled();
    for (let y=0; y<res.length; y++){
      if (resDisabled.includes(res[y])){
        return true;
      }
      else {
        return false;
      }
    }
  }


const handleTileDisabled = ({view, date}) => {
  if (view == "month"){
    return handleDisabled().find(dDate => isSameDay(dDate, date));
  }
}

const handleSubmit = (e) => {
  e.preventDefault();
  setShow(true);
}

const handleReservation = (e) => {
  handlePrice();
  if (isAuth){
    if (heureDepart == "" || heureRetour == ""){
      NotificationManager.warning("", "Veuillez sélectionner des dates", 3000);
    }
    e.preventDefault();
    if (!handleRange()){
      axios.post("http://localhost:3000/api/resa/save", {
          depart : new Date(selectedDepart.setDate(selectedDepart.getDate()+1)),
          retour : new Date(selectedRetour.setDate(selectedRetour.getDate()+1)),
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
    }else{
      NotificationManager.warning("", "Veuillez changer les dates", 3000)
    }
  }else{
    NotificationManager.warning("", "Veuillez vous connecter pour effectuer une réservation", 5000)
  }
  setDisplay(false);
}

const handlePrice = () => {
  setDisplay(true);
  let nb = differenceBetweenDays(selectedRetour, selectedDepart);

  if (currentVoiture == "Renault Captur" || currentVoiture == "Renault Clio" || currentVoiture == "Peugeot Partner" || currentVoiture == "Fiat Doblo" || currentVoiture == "Renault Scénic"){
      handleVerifPrice(30, nb);
  }
  else if (currentVoiture == "Ford transit" ){
    handleVerifPrice(35, nb);
  }
  else if (currentVoiture == "Citroën C3") {
    handleVerifPrice(25, nb);
  }
  else if (currentVoiture == "Peugeot 207"){
    handleVerifPrice(20, nb);
  }
}

const handleVerifPrice = (price, nb) => {
  if (nb > 2){
    setPrice(price*0.85*nb);
    setReduction(15);
  }
  else if (nb > 7) {
    setPrice(price*nb*0.65);
    setReduction(35);
  }
  else if (nb > 30){
      setPrice(price*nb*0.57);
      setReduction(47);
  }
  else{
      setPrice(price*nb);
      setReduction(0);
  }
  setOldPrice(price*nb);
}

return <div className='container-picker'>
  <NotificationContainer/>
  <h1>Calendrier</h1>
  <form className='search-voiture' onSubmit={handleSubmit}>
    <select id="selected-voiture" onClick={() => setShow(false)} onChange={handleVoiture}>
      {displayOption}
    </select>
    <Button buttonColor={"blue"} buttonSize={"large"} buttonStyle="primary">Chercher</Button>
  </form>
  {show && (
    <>
    <div className='container-calendar'>
       <div className='calendar1'> 
        <p>Sélectionner une date de départ</p>
        <Calendar value={selectedDepart} onChange={setSelectedDepart} minDate={new Date()} tileDisabled={handleTileDisabled} />
        </div>
        <div className='heure'>
          <label className='label' htmlFor='depart'>Heure de départ</label>
          <input className='input' type="number" id="depart" onChange={(e) => setHeureDepart(e.target.value)} required></input>
          <label className='label' htmlFor='retour'>Heure de retour</label>
          <input className='input' type="number" id="retour" onChange={(e) => setHeureRetour(e.target.value)} required></input>
        </div>
        <div className='calendar2'>
        <p>Sélectionner une date de retour</p>
        <Calendar value={selectedRetour} onChange={setSelectedRetour} minDate={selectedDepart} tileDisabled={handleTileDisabled}/>
        </div>
    </div>
    {display && (
    <div className='container-price'>
      <div>
       <p className='new'>{price}€ </p>
      </div>
      
    </div>)}
    <Button onClick={handleReservation} buttonColor={"blue"} buttonSize={"large"} buttonStyle="primary">Réserver</Button></>
  )}
    

    

</div>
}
export default Calendrier;
