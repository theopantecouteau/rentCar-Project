import React, { useContext, useState } from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
import Home from './components/pages/HomePage/Home';
import Login from './components/Login';
import Suscribe from './components/Suscribe';
import Contact from './components/pages/Contact';
import CardCar from './components/CardCar';
import Dashboard from './components/pages/Dashboard';
import {isAuthentifacted, logout} from "./services/AuthApi";
import Auth from './contexts/Auth';
import { useIsAdmin } from './services/Admin';
import Ask from './components/pages/Ask';
import Bid from './components/pages/Bid';
import Messenger from './components/pages/Messenger';
import Message from './components/Message';
import Calendrier from './components/Calendrier';
import {isAdministrator} from './services/Admin';
import { getUserId } from './services/LocalStorage';
import Admin from './contexts/Admin';
import Add from './components/Add';
import { useEffect } from 'react';

function App() {

  const [isAuth, setAuth] = useState(isAuthentifacted());
  const [isAdmin, setAdmin] = useState(isAdministrator(getUserId('user')));

  const verifiyToken = () => {
    if (!verifiyToken("monsitewebtoken")){
      logout();
    }
  }
 
  return (
    <Auth.Provider value={{isAuth, setAuth}}>
    <Admin.Provider value={{isAdmin, setAdmin}}>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' exact element={<Home/>}>Accueil</Route>
        <Route path='/contact' exact element={<Contact/>}>Contact</Route>
        <Route path='/voiture/:id' exact element={<CardCar/>}>Voitures</Route>
        <Route path='/calendar' exact element={<Calendrier/>}>Calendrier</Route>
          <Route path='/bid' exact element={<Bid/>}>Réservations</Route>
          <>
          <Route path='/login' exact element={<Login/>}>Se connecter</Route>
          <Route path='/suscribe' exact element={<Suscribe/>}>S'inscrire</Route>
          </>
            <>
          <Route path='/dashboard' exact element={<Dashboard/>}>Dashboard</Route>
          <Route path='/messenger' exact element={<Messenger/>}>Messages</Route>
          </>
          <Route path='/add' exact element={<Add/>}></Route>

      </Routes>
    </BrowserRouter> 
    </Admin.Provider>
    </Auth.Provider>
  );
}

export default App;