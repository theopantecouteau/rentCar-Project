import React, {useRef, useEffect, useLayoutEffect, useContext} from 'react';
import { Button } from '../../Button';
import { Link } from 'react-router-dom';
import "../../styles/heroSection.css"
import "../../styles/home.css"
import Cars from '../../Cars';
import Footer from '../Footer/Footer';
import {MdOutlineFreeCancellation, MdPlace} from "react-icons/md";
import {FaAssistiveListeningSystems} from "react-icons/fa";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import Auth from '../../../contexts/Auth';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



function Home() {

  const {isAuth, setAuth} = useContext(Auth);

  const slideToUp = (elem, delay, duration) => {
    gsap.fromTo(
      elem,
      {
        opacity: 0,
        y: -200
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger : {
          trigger : elem,
          start : "top center",
          end : "bottom center"
        }
      }

    )
  }

  const slideInLeft = (elem, delay, duration) => {
    gsap.fromTo(
      elem,
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
  
  useEffect(() => {
    slideInLeft("#icon");
  })

  

  return (
    <div className='container-for-zIndex'>
      
        <div
          className='home-background-image home__hero-section-home'
        >
          <div className='container'>
            <div
              className='row home__hero-row'
            >
              <div className='col-home' >
                <div className='home__hero-text-wrapper'>
                  <div className='top-line'>BIENVENUE</div>
                  <h1 className='heading'>
                    Trouver tout type de véhicule, à bas prix ! 
                  </h1>
                  <p
                    className='home__hero-subtitle-home'
                  >
                    Chez Easyloc, nous vous assurons un service de qualité, où vous voulez et quand vous voulez sur tout Montpellier !
                  </p>
                  {!isAuth && (
                  <Link to='/suscribe'>
                    <Button buttonSize='btn--large' buttonColor='blue'>
                      S'inscrire
                    </Button>
                  </Link>)}
                </div>
              </div>
              <div className='col'>
              </div>
            </div>
          </div>
        </div>
      
      
        <div id='icon' className='icon-pub' >
          <div className='annulation'><MdOutlineFreeCancellation color='dodgerblue' size={80} /><div className='text'><h4>Annulation Gratuite</h4><br/><p>Jusqu'à 48 heures avant le début de la réservation</p></div>
          </div>
          <div className='annulation'><FaAssistiveListeningSystems size={70} color='dodgerblue' /><div className='text'><h4>Voyager en sécurité</h4><br/><p>Assistance et assurance comprises</p></div>
          </div>
          <div className='annulation'><MdPlace size={80} color='dodgerblue' /><div className='text'><h4>Choisissez le lieu</h4><br/><p>Nous vous livrons la voiture où vous voulez</p></div>
          </div>
        </div>  

        <hr style={{marginTop : "5%"}}></hr>
      
      <Cars/>
      <Footer/>
    </div>
  );
}

export default Home;