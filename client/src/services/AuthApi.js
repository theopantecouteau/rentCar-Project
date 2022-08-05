import React, { useContext } from 'react';
import Auth from '../contexts/Auth';
import { addItem, getItem, removeItem } from './LocalStorage';
import jwtDecode from "jwt-decode";
import axios from 'axios';


export function isAuthentifacted(){
    const token = getItem('monsitewebtoken');
    const result = token ? isValidToken(token) : false;
    if (result === false){
        removeItem('monsitewebtoken');
    }
    return result;
}

export async function login(mail, pwd){
    return axios.post("http://localhost:3000/api/auth/login", {
        email : mail,
        password : pwd
    }).then((response) => {
        const token = (response.data.token);
        addItem('monsitewebtoken', token);
        return response.data;
    });
}

export function logout(){
    removeItem('monsitewebtoken');
}

export function isValidToken(token){
    const {exp} = jwtDecode(token);
        if (exp*100 < new Date().getTime()){
            return true
        };
        return false;
}
