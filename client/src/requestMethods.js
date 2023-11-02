import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/";


const user = JSON.parse(localStorage.getItem("persist:admin"))
console.log("user ", user)

const currentUser = user && JSON.parse(user.currentUser);
console.log("currentUser ", currentUser)


const TOKEN = currentUser?.accessToken
console.log("TOKEN ", TOKEN)



export const publicRequest = axios.create({
    baseURL: API_URL,
});

export const userRequest = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${TOKEN}` },
});