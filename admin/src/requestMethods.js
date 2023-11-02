import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/"

const user = JSON.parse(localStorage.getItem("persist:dashbord"))?.user;
// console.log("user ", user)

const currentUser = user && JSON.parse(user).currentUser;
// console.log("currentUser ", currentUser)


const TOKEN = currentUser?.accessToken;
// console.log("TOKEN ", TOKEN)



export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${TOKEN}` },
});