import {
    SET_MESSAGE,
    OVERVIEW_SUCCESS,
    GENERIC_FAILURE
  } from "./type";
  import MassNahmenDataService from "../services/massnahmen";
  
  export const getMassNahmenData = (peopleId) => (dispatch) => {
    return MassNahmenDataService.getMassNahmenData(peopleId).then(
      (data) => {
        dispatch({
          type: OVERVIEW_SUCCESS,
          payload: { massnahmenData: data },
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
        return Promise.reject();
      }
    );
  };

  export const createMassNahmenData = (peopleId,data) => (dispatch) => {
    return MassNahmenDataService.postMassNahmenData(peopleId, data).then(
      (data) => {
        dispatch({
          type: OVERVIEW_SUCCESS,
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

  export const deleteMassNahmenData = (id, dataId, key) => (dispatch) => {
    return MassNahmenDataService.deleteMassNahmenData(id, dataId, key).then(
      () => {
        dispatch({
          type: OVERVIEW_SUCCESS,
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

  export const updateMassNahmenData = (peopleId, dataId, data) => (dispatch) => {
    return MassNahmenDataService.updateMassNahmenData(peopleId, dataId, data).then(
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