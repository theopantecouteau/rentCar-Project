import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./styles/cardcar.css";
import Loading from './Loading';
import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {AiFillInfoCircle} from 'react-icons/ai';
import { Button } from './Button';

export default function CardCar() {

    const [data, setData] = useState("")
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    let id = location.state.params;
    let src = location.state.src;
    const navigate = useNavigate();

    useEffect( () => {
            let body; 
            async function getData() {
                await axios.get("http://localhost:3000/api/voiture/display").then((response) => {
                body = response.data.cars;
                setLoading(false);
                console.log(body[0]);
                console.log(id);
                setData({
                    title: body[id+1].nom,
                    type : body[id+1].type,
                    price: body[id+1].prix,
                    description : body[id+1].description,
                    getaround : body[id+1].getaround,
                    ouicar : body[id+1].ouicar
                });
                
            });
        }
        getData();
    }, []);

    console.log("lien : "+data.getaround);

    return (
        <div className='container-cardcar'>
                <div className='col1'>
                    <img className='image' src={src} alt="voiture"></img>
                    <p>Réserver sur </p>
                    <div className='btn-container'>
                        <a target="_blank" href={data.getaround}><Button className="btn-getaround" buttonSize="btn--large" buttonColor="getaround">GETAROUND</Button></a>
                        <a target="_blank" href={data.ouicar}><Button className="btn-ouicar" buttonSize="btn--large" buttonColor="ouicar">OUICAR</Button></a>
                    </div>
                </div>
                
                <div className='col2'>  
                {loading ? <Loading></Loading> : 
                    <>
                    <h5 className='type'>{data.type}</h5><br></br>
                    <h1 className='title'>{data.title}</h1><br></br>
                    <p className='description'>{data.description}</p><br></br>
                    <div className='button-price'><Button buttonSize="btn--medium" buttonColor="blue">À partir de {data.price}€ la journée*</Button></div>
                    <p className='info'><AiFillInfoCircle/> Des réduction sont appliquées en fonction de la durée de la location !</p></>}
                </div>
            </div>
    )
    
        
}
