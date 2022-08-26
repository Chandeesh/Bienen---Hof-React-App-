import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  ACTIVATION_SUCCESS,
  DELETE_USER
} from "./type";
import AuthService from "../services/auth-service";

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const initiateResetPassword = (emailId) => (dispatch) => {
  return AuthService.initiateResetPassword(emailId).then(
    (data) => {
      dispatch({
        type: SET_MESSAGE,
        payload: data
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }

  )
};

export const activate = (token) => (dispatch) => {
  return AuthService.activate(token).then(
    () => {
      dispatch({
        type: ACTIVATION_SUCCESS,
      });
      return Promise.resolve();
    }
  );
};

export const verifyPassword = (token) => (dispatch) => {
  return AuthService.verifyPassword(token).then(
    () => {
      dispatch({
        type: ACTIVATION_SUCCESS,
      });
      return Promise.resolve();
    }, (error) => {
      const message =
        error.response.data
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const updatePassword = (emailId, password) => (dispatch) => {
  console.log("inside asdasd")
  return AuthService.updatePassword(emailId, password).then(
    () => {
      dispatch({
        type: ACTIVATION_SUCCESS,
      });
      return Promise.resolve();
    }, (error) => {
      const message =
        error.response.data
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const deleteUser = (emailId) => (dispatch) => {
  return AuthService.deleteUser(emailId).then(
    () => {
      dispatch({
        type: LOGOUT,
      });
      return Promise.resolve();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};