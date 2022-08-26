import {
    SET_MESSAGE,
    OVERVIEW_SUCCESS,
    GENERIC_FAILURE
  } from "./type";
  import NotizenDataService from "../services/people-notizen-service";
  
  export const getNotizenData = (peopleId) => (dispatch) => {
    return NotizenDataService.getNotizenData(peopleId).then(
      (data) => {
        dispatch({
          type: OVERVIEW_SUCCESS,
          payload: { peopleData: data },
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

  export const createNotizenData = (peopleId,text) => (dispatch) => {
    return NotizenDataService.postNotizenData(peopleId,text).then(
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

  export const deleteNotizenData = (id) => (dispatch) => {
    return NotizenDataService.deleteNotizenData(id).then(
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

  export const updateNotizenData = (id, text) => (dispatch) => {
    return NotizenDataService.updateNotizenData(id, text).then(
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