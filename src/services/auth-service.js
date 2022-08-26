import axios from "axios";

const API_URL = "http://localhost:8080/bienen/user/";

const register = (userName, emailId, password) => {
    return axios.post(API_URL + "register", {
        userName,
        emailId,
        password,
    });
};
const login = (emailId, password) => {
    return axios
        .post(API_URL + "login", {
            emailId,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};
const activate = (activationToken) => {
    return axios
        .put(API_URL + "confirm",  {}, { params: { token: activationToken } })
};
const logout = () => {
    localStorage.removeItem("user");
};

const initiateResetPassword = (emailId) => {
    return axios.put(API_URL + 'initiateresetpassword', {
        emailId
    })
    .then((response) => {
        return response;
    });
};

const verifyPassword = (verificationToken) => {
    return axios.get(API_URL + 'confirmresetpassword',{ params: { token: verificationToken } })
    .then((response) => {
        return response;
    });
};

const updatePassword = (emailId, password) => {
    return axios.put(API_URL + 'updatepassword', {
        emailId,    
        password
    })
    .then((response) => {
        return response;
    });
};

const deleteUser = (emailId) => {
    console.log()
    return axios.delete(API_URL + "delete/"+ emailId);
}
export default {
    register,
    login,
    logout,
    activate,
    initiateResetPassword,
    verifyPassword,
    updatePassword,
    deleteUser
};