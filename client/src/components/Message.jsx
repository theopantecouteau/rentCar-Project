import React, {useEffect, useState} from 'react';
import { isAdmin, getUserId } from '../services/LocalStorage';
import axios from 'axios';
import { Button } from './Button';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ImCross } from 'react-icons/im';

export default function Message(props) {

    const [show, setShow] = useState(false);
    const [textarea, setTextarea] = useState("");

    const handleReply = (e) => {
        e.preventDefault();
        if (!admin){
            axios.post("http://localhost:3000/api/mess/send", {
                from : getUserId('user'),
                to : "627120a1eac5c68baa023a37",
                message : textarea

            }).then((res) => NotificationManager.success("", "Le message non admin a bien été envoyé !", 3000))
            .catch((err) => NotificationManager.error("", "Un problème est survenue, veuillez réessayer.", 3000));
        }
        else{
            axios.post("http://localhost:3000/api/mess/send", {
                from : "627120a1eac5c68baa023a37",
                to : props.from,
                message : textarea
            }).then((res) => NotificationManager.success("", "Le message  admin a bien été envoyé !", 3000))
              .catch((err) =>  NotificationManager.error("", "Un problème admin est survenue, veuillez réessayer.", 3000));
        }
        setShow(false);
    }

    const handleDelete = (id) => {
        axios.delete("http://localhost:3000/api/mess/remove", {params : {id : id}})
             .then((res) => NotificationManager.success("", "Le message a bien été supprimé", 3000))
             .catch((err) => NotificationManager.error("", "Une erreur est survenue, veuillez réassayer", 3000))
    }

    const admin = (getUserId('user') == "627120a1eac5c68baa023a37");
    const messAdmin = props.from != "627120a1eac5c68baa023a37";
    const user = (props.from == "627120a1eac5c68baa023a37" && props.to == getUserId('user'));

    return (<><NotificationContainer/>
        {admin ? 
                (messAdmin ? (<div className='card-mess'>
                                                                <div className='mess'>
                                                                        <p><span>From </span>  {props.name}</p>
                                                                        <div className='flex-div'>
                                                                            <p className='mess-text'> {props.message}</p>
                                                                            <div className='container-btn'>
                                                                                <Button onClick={() => setShow(true)} buttonSize={"btn--medium"} buttonColor="blue">Répondre</Button> 
                                                                                <ImCross size={50} color={"red"} onClick={() => handleDelete(props.id)}/>
                                                                            </div>
                                                                        </div>         
                                                                </div>
                                                            </div>) : "" ) : 
                (user ? (<div className='card-mess'>
                                                                                                    <div className='mess'>
                                                                                                        <p><span>from </span> : {props.name}</p>
                                                                                                        <div className='flex-div'>
                                                                                                            <p className='mess-text'> {props.message}</p>
                                                                                                            <div className='container-btn'>
                                                                                                            <Button onClick={() => setShow(true)} buttonSize={"btn--medium"} buttonColor="blue">Répondre</Button> 
                                                                                                            <ImCross size={50} color={"red"} onClick={() => handleDelete(props.id)}/>
                                                                                                        </div>                                                                                                        </div>         
                                                                                                    </div>
                                                                                                </div>) : "")

            }
            {show &&(
                <div ><form className='form-reply' onSubmit={handleReply}>
                    <textarea placeholder='Votre message ...' onChange={(event)=>setTextarea(event.target.value)} className='textarea input'></textarea>
                    <Button className="btn-reply" buttonSize={"btn--medium"} buttonColor="blue">Envoyer</Button>
                    </form>
                </div>
            )}
        </>
    )
}
