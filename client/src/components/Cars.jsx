import React from 'react'
import HeroSection from './HeroSection';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import {gsap} from "gsap";
import { getVoiture } from '../services/LocalStorage';
import Loading from "./Loading";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



export default function Cars() {

   
    const [loading, setLoading] = useState(true);
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

    const img = useState([]);

    const slideInLeft = (elem, delay, duration) => {
      gsap.fromTo(elem,
        {
          opacity: 0,
          x: -200
        },
        {
          opacity: 1,
          x: 0,
          scrollTrigger : {
            trigger : elem,
            start : "top center",
            end : "bottom center"
          }
        }
  
      )
    }

    useEffect(()=> {
      for (let i=1; i<data.length; i++){
        slideInLeft(".car"+i);
      }
    }, [data.length]);
  
    useEffect( () => {
        const getData= async () => {
          axios.get("http://localhost:3000/api/voiture/display").then((response) => {
            let body = response.data.cars;
            setdata([...body]);  
            setLoading(false);
          })
        };
        getData();
         
    }, []);
    
    const setObject = data.map((car, id) => {
      let obj = {}
      if (id%2 == 0){
        obj = {
          id : id,
          lightBg : false,
          lightText : true,
          lightTextDesc: true,
          buttonLabel : 'Réserver',
          imgStart : '',
          description : "À partir de " + car.prix + "€/jour",
          headline : car.nom,
          topLine : car.type,
          prix : car.prix,
          img : car.image,
          className : "car"+id
        }
      }
      else{
        obj = {
          id : id,
          lightBg : true,
          lightText : false,
          lightTextDesc: false,
          buttonLabel : 'Réserver',
          imgStart : 'start',
          description : "À partir de " + car.prix + "€/jour",
          headline : car.nom,
          topLine : car.type,
          prix : car.prix,
          img : car.image,
          className : "car"+id
      }     
    }
    return <HeroSection {...obj}/>
  })

  

  return (
    
      <div className='container-cars'>
        {loading ? <Loading></Loading> : setObject}
      </div>
  )
}

  
  