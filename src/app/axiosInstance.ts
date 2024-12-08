import axios from "axios";
import { getCookie } from "typescript-cookie";

export const urlApi = "http://localhost:3000";

export const RestInstanse = axios.create({
    withCredentials: false,
    baseURL: `${urlApi}/users/`,
    headers: { Authorization: `Bearer ${getCookie("token")}` },
    // headers : { "Authorization" : "BasicCustom", "Content-Type": 'application/json' }
    // headers: { "Content-Type": "multipart/form-data","Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS", }
});
