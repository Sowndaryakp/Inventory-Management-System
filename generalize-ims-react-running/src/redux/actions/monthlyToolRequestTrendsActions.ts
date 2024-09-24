import { Dispatch } from 'redux';
import axios from 'axios';

export const FETCH_MONTHLY_TOOL_REQUEST_TRENDS_REQUEST = 'FETCH_MONTHLY_TOOL_REQUEST_TRENDS_REQUEST';
export const FETCH_MONTHLY_TOOL_REQUEST_TRENDS_SUCCESS = 'FETCH_MONTHLY_TOOL_REQUEST_TRENDS_SUCCESS';
export const FETCH_MONTHLY_TOOL_REQUEST_TRENDS_FAILURE = 'FETCH_MONTHLY_TOOL_REQUEST_TRENDS_FAILURE';

export const fetchMonthlyToolRequestTrends = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_MONTHLY_TOOL_REQUEST_TRENDS_REQUEST });

    try {
      const response = await axios.get('http://172.18.7.27:8000/analytics/monthly_request_trends');
      dispatch({
        type: FETCH_MONTHLY_TOOL_REQUEST_TRENDS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching monthly tool request trends:', error);
      dispatch({
        type: FETCH_MONTHLY_TOOL_REQUEST_TRENDS_FAILURE,
        error: error.message || 'An error occurred while fetching monthly tool request trends',
      });
    }
  };
};
