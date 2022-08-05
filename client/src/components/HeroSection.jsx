import React, { useState, useRef, useEffect } from 'react'
import "./styles/heroSection.css"
import { Button } from './Button'
import CardCar from './CardCar';
import ReactDOM from 'react-dom/client';
import {useNavigate} from "react-router-dom";
import {gsap} from "gsap";




const Modal = ({ children }) => {
  const element = document.getElementById("overlay");
  if (children) {
    element.classList.remove("hidden");
    return ReactDOM.createPortal(children, element);
  }
  element.classList.add("hidden");
  return null;
};


function HeroSection({
    id,
    lightBg,
    topLine,
    lightText,
    lightTextDesc,
    headline,
    description,
    buttonLabel,
    img,
    alt,
    imgStart, 
    className 
  }) {


    const [showDialog, setShowDialog] = useState(false);
    const open = () =>setShowDialog(true);
    const close = () => setShowDialog(false);
    const navigate = useNavigate();

    const redirection = () => {
      let url = '/voiture/'+id;
      navigate(url, {state : {params: id-1, src : img}});
    }

    return (
      <div className={className}>
      <div className='container-page-home'>
        
        <div
          className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
        >
          <div className={lightBg ? 'container' : 'container container-darkBg'}>
            <div
              className='row home__hero-row'
              style={{
                display: 'flex',
                flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
              }}
            >
              <div className='col'>
                <div className='home__hero-text-wrapper'>
                  <div className='top-line'>{topLine}</div>
                  <h1 className={lightText ? 'heading' : 'heading dark'}>
                    {headline}
                  </h1>
                  <p
                    className={
                      lightTextDesc
                        ? 'home__hero-subtitle'
                        : 'home__hero-subtitle dark'
                    }
                  >
                    {description}
                  </p>
                    <Button  onClick={redirection} buttonSize='btn--wide' buttonColor='blue'>
                        {buttonLabel}
                    </Button>

                    
                </div>
              </div>
              <div className='col'>
                <div className='home__hero-img-wrapper'>
                  <img src={img} alt={alt} className='home__hero-img' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default HeroSection;

  