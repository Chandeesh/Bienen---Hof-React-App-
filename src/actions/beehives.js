import {
  SET_MESSAGE,
  OVERVIEW_SUCCESS,
  GENERIC_FAILURE
} from "./type";
import BeehiveService from "../services/beehive-service";

export const getBeehives = (emailId) => (dispatch) => {
  return BeehiveService.getBeehives(emailId).then(
    (data) => {
      dispatch({
        type: OVERVIEW_SUCCESS,
        payload: { myBeehives: data },
      });
      return Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: GENERIC_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error);
    }
  );
};

export const saveBeehive = (name, emailId, location, postcode) => (dispatch) => {
  return BeehiveService.saveBeehive(name, emailId, location, postcode).then(
    () => {
      dispatch({
        type: OVERVIEW_SUCCESS
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
        type: GENERIC_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const updateBeehive = (id, name, location, postcode) => (dispatch) => {
  return BeehiveService.updateBeehive(id, name, location, postcode).then(
    () => {
      dispatch({
        type: OVERVIEW_SUCCESS
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
        type: GENERIC_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const deleteBeehive = (id) => (dispatch) => {
  return BeehiveService.deleteBeehive(id).then(
    () => {
      dispatch({
        type: OVERVIEW_SUCCESS
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
        type: GENERIC_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};