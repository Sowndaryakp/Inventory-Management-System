// src/redux/actions/mostRequestedToolsActions.ts

import { Dispatch } from 'redux';
import axios from 'axios';

export const FETCH_MOST_REQUESTED_TOOLS_REQUEST = 'FETCH_MOST_REQUESTED_TOOLS_REQUEST';
export const FETCH_MOST_REQUESTED_TOOLS_SUCCESS = 'FETCH_MOST_REQUESTED_TOOLS_SUCCESS';
export const FETCH_MOST_REQUESTED_TOOLS_FAILURE = 'FETCH_MOST_REQUESTED_TOOLS_FAILURE';

export const fetchMostRequestedTools = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_MOST_REQUESTED_TOOLS_REQUEST });

    try {
      const response = await axios.get('http://172.18.7.27:8000/analytics/most_requested_tools');
      dispatch({
        type: FETCH_MOST_REQUESTED_TOOLS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching most requested tools:', error);
      dispatch({
        type: FETCH_MOST_REQUESTED_TOOLS_FAILURE,
        error: error.message || 'An error occurred while fetching most requested tools',
      });
    }
  };
};
