import React, { useState, useEffect, useContext } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './styles/navbar.css';
import { MdFingerprint } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import Auth from "../contexts/Auth"
import { isValidToken, logout } from '../services/AuthApi';
import {removeUser, getUserId } from '../services/LocalStorage';
import Admin from '../contexts/Admin';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const {isAuth, setAuth} = useContext(Auth);
  const {isAdmin, setAdmin} = useContext(Admin);
 
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  

  const handleLogout = () => {
    logout();
    setAuth(false);
    removeUser('user');
  }

  useEffect(() => {
    showButton();
    }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <MdFingerprint className='navbar-icon' />
              Easyloc
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Accueil
                </Link>
              </li>
              
              <li className='nav-item'>
                <Link
                  to='/calendar'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Calendrier
                </Link> 
              </li>
              {isAuth && (
              <li className='nav-item'>
              <Link
                to='/messenger'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Messages
              </Link>
            </li>)}
              
              {!isAuth &&  (
              <li className='nav-item'>
                <Link
                  to='/contact'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>)}
              { (!isAuth && (
                <>
              <li className='nav-btn'>
                {button ? (
                  <Link to='/login' className='btn-link'>
                    <Button buttonStyle='btn--outline'>Se connecter</Button>
                  </Link>
                ) : (
                  <Link to='/login' className='btn-link'>
                    <Button
                      buttonStyle='btn--outline'
                      buttonSize='btn--mobile'
                      onClick={closeMobileMenu}
                    >
                      Se connecter
                    </Button>
                  </Link>
                )}
              </li>
              <li className='nav-btn'>
                {button ? (
                  <Link to='/suscribe' className='btn-link'>
                    <Button buttonStyle='btn--outline'>S'inscrire</Button>
                  </Link>
                ) : (
                  <Link to='/suscribe' className='btn-link'>
                    <Button
                      buttonStyle='btn--outline'
                      buttonSize='btn--mobile'
                      onClick={closeMobileMenu}
                    >
                      S'inscrire
                    </Button>
                  </Link>
                )}
              </li></> )
               || 
              <>
              {isAdmin && (
                <>
              <li className='nav-item'>
                <Link
                  to='/bid'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Réservations
                </Link>
              </li> 
              <li className='nav-item'>
              <Link
                to='/add'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Ajouter 
              </Link>
            </li></>)}
              <li className='nav-btn'>
                {button ? (
                  <Link to='/dashboard' className='btn-link'>
                    <Button buttonStyle='btn--outline'>Mon Compte</Button>
                  </Link>
                ) : (
                  <Link to='/dashboard' className='btn-link'>
                    <Button
                      buttonStyle='btn--outline'
                      buttonSize='btn--mobile'
                      onClick={closeMobileMenu}
                    >
                      Mon Compte
                    </Button>
                  </Link>
                )}
              </li>
              <li className='nav-btn'>
                {button ? (
                  <Link to='/' className='btn-link'>
                    <Button onClick={handleLogout} buttonStyle='btn--outline'>Déconnexion</Button>
                  </Link>
                ) : (
                  <Link to='/' className='btn-link'>
                    <Button
                      buttonStyle='btn--outline'
                      buttonSize='btn--mobile'
                      onClick={closeMobileMenu}
                    >
                      Déconnexion
                    </Button>
                  </Link>
                )}
              </li></>)}

            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;