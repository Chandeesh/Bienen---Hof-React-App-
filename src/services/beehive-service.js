import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/bienen/beehive";

const getBeehives = (emailId) => {
    return axios.get(API_URL + "/" + emailId, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const saveBeehive = (name, emailId, location, postcode) => {
    return axios.post(API_URL, {
        name,
        emailId,
        location,
        postcode
    }, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const updateBeehive = (id, name, location, postcode) => {
    return axios.put(API_URL, {
        id,
        name,
        location,
        postcode
    }, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const deleteBeehive = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

export default {
    getBeehives,
    saveBeehive,
    updateBeehive,
    deleteBeehive
};