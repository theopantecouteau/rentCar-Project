import { useContext } from "react";
import Auth from "../contexts/Auth";
import React from "react";
import axios from "axios";

export async function isAdministrator(id){
    const user = await axios.get("http://localhost:3000/api/auth/id", {params : {id : id}});
    console.log(user);
    return user.data.admin;
}