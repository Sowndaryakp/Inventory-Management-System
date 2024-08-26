// src/redux/actions/requestsByDepartmentActions.ts

import { Dispatch } from 'redux';
import axios from 'axios';

export const FETCH_REQUESTS_BY_DEPARTMENT_REQUEST = 'FETCH_REQUESTS_BY_DEPARTMENT_REQUEST';
export const FETCH_REQUESTS_BY_DEPARTMENT_SUCCESS = 'FETCH_REQUESTS_BY_DEPARTMENT_SUCCESS';
export const FETCH_REQUESTS_BY_DEPARTMENT_FAILURE = 'FETCH_REQUESTS_BY_DEPARTMENT_FAILURE';

export const fetchRequestsByDepartment = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_REQUESTS_BY_DEPARTMENT_REQUEST });

    try {
      const response = await axios.get('http://172.18.7.27:8000/analytics/requests_by_department');
      dispatch({
        type: FETCH_REQUESTS_BY_DEPARTMENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching requests by department:', error);
      dispatch({
        type: FETCH_REQUESTS_BY_DEPARTMENT_FAILURE,
        error: error.message || 'An error occurred while fetching requests by department',
      });
    }
  };
};
