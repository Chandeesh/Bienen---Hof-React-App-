import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/bienen/people/notizen";

const getNotizenData = (peopleId) => {
    return axios.get(API_URL + "/" + peopleId, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const postNotizenData = (peopleId, text) => {
    return axios.post(API_URL, {
        peopleId,
        text
    }, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const deleteNotizenData = (id) => {
    return axios.delete(API_URL + "/" + id,
    { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const updateNotizenData = (id, text) => {
    return axios.put(API_URL, {
        id,
        text
    }, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

export default {
    getNotizenData,
    postNotizenData,
    deleteNotizenData,
    updateNotizenData
};