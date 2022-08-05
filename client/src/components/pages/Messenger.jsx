import React, {useEffect, useState} from 'react';
import {Button} from "../Button";
import "../styles/messenger.css";
import axios from "axios";
import { getUserId, isAdmin } from '../../services/LocalStorage';
import {ImCross} from "react-icons/im";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Message from '../Message';


export default function Messenger() {

    const [show, setShow] = useState(false);
    const [textarea, setTextarea] = useState("");
    const [client, setClient] = useState([])
    const [idClient, setIdClient] = useState([]);
    const [admin, setAdmin] = useState(getUserId('user') == "627120a1eac5c68baa023a37");
    const [asso, setAsso] = useState([]);
    const [data, setData] = useState([{
        from : "",
        message : "",
        to : "",
        __v : "",
        _id: ""
    }]);

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get("http://localhost:3000/api/mess/display");
            setData(result.data.mess);
        };
        const getUser = async () => {
            const result = await axios.get("http://localhost:3000/api/auth/all");
            let array = new Array();
            let array2 = new Array();
            let res = new Array();
            for (let i=0; i< result.data.length; i++){
                array[i] = result.data[i].nom;
                array2[i] = result.data[i]._id;
                let obj = {nom : result.data[i].nom, id : result.data[i]._id};
                res.push(obj);
            }
            setAsso([...res]);
            setClient([...array]);
            setIdClient([...array2]);
        };
        getData();  
        getUser();         
    },[])

    console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!admin){
            axios.post("http://localhost:3000/api/mess/send", {
                from : getUserId('user'),
                to : "627120a1eac5c68baa023a37",
                message : textarea

            }).then((res) => NotificationManager.success("", "Le message a bien été envoyé !", 3000))
            .catch((err) => NotificationManager.error("", "Un problème est survenue, veuillez réessayer.", 3000));
        }
        else{
            let num = document.getElementById("selectId").selectedIndex;
            let id = idClient[num];
            axios.post("http://localhost:3000/api/mess/send", {
                from : "627120a1eac5c68baa023a37",
                to : id,
                message : textarea
            }).then((res) => NotificationManager.success("", "Le message a bien été envoyé !", 3000))
              .catch((err) =>  NotificationManager.error("", "Un problème est survenue, veuillez réessayer.", 3000));
        }
        setShow(false);
    }

    const displayOption = client.map((nom) => {
        if (nom == 'admin'){
            return;
        }
        return <option key={nom}>{nom}</option> 
    })

    const getMessage = data.map((mess) => {
        let from;
        for (let i=0; i<asso.length; i++){
            if (asso[i].id === mess.from){
                from = asso[i].nom;
                break;
            }
        }
        return <><Message key={mess._id} id={mess._id} name={from} from={mess.from} to={mess.to} message={mess.message} /></>

    })

    const getNumberUserMessage = () => {
        let user=0;
        for (let i=0; i<data.length; i++){
            if (data[i].to == getUserId('user')){
                user++
            }
        }
        return user;
    }

    const getNumberAdminMessage = () => {
        let admin=0;
        for (let i=0; i<data.length; i++){
            if (data[i].to == "627120a1eac5c68baa023a37"){
                admin++
            }
        }
        return admin;
    }

    console.log("admin" + getNumberAdminMessage());
    console.log("user"+getNumberUserMessage());
  
  return (
    <>
   <NotificationContainer/>
    <div className='messenger-container'>
        {show ?  (<ImCross onClick={() => setShow(false)} size={40} color="#c3c3c3" className='close'/>) : "" }
        <Button className="message-btn" onClick={() => setShow(true)} buttonSize="btn--large" buttonColor="blue">Envoyer un message</Button>
        {show ? (admin ? 
            (<form className='form-send' onSubmit={handleSubmit}>
                <select id='selectId'>
                     {displayOption}
                </select>
                <textarea placeholder='Votre message ...' onChange={(event) => setTextarea(event.target.value)} className='input textarea' required></textarea>
                <Button buttonSize="btn--large" buttonColor="blue" className='btn-send-mess'>Envoyer</Button>  
            </form>)
            : 
            (<form className='form-send' onSubmit={handleSubmit}>
                <textarea placeholder='Votre message ...' onChange={(event) => setTextarea(event.target.value)} className='input textarea' required></textarea>
                <Button buttonSize="btn--large" buttonColor="blue" className='btn-send-mess'>Envoyer</Button>  
            </form>)

        ) : (
            <div className='container-mess'>
            {admin ? (getNumberAdminMessage() <= 1 ? <p className='no-msg'>Pas de message</p> : getMessage) : (getNumberUserMessage() < 1 ? <p className='no-msg'>Pas de message</p> : getMessage)}
            </div>
        )}
    </div>
    </>
  )
}
