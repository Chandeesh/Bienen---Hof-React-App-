import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/bienen/";

const getContacts = () => {
    return axios.get(API_URL + "contacts", { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

export default {
    getContacts,
};