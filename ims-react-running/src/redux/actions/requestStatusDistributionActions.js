// src/redux/actions/requestStatusDistributionActions.ts
import axios from 'axios';
export const FETCH_REQUEST_STATUS_DISTRIBUTION_REQUEST = 'FETCH_REQUEST_STATUS_DISTRIBUTION_REQUEST';
export const FETCH_REQUEST_STATUS_DISTRIBUTION_SUCCESS = 'FETCH_REQUEST_STATUS_DISTRIBUTION_SUCCESS';
export const FETCH_REQUEST_STATUS_DISTRIBUTION_FAILURE = 'FETCH_REQUEST_STATUS_DISTRIBUTION_FAILURE';
export const fetchRequestStatusDistribution = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_REQUEST_STATUS_DISTRIBUTION_REQUEST });
        try {
            const response = await axios.get('http://172.18.7.27:8000/analytics/request_status_distribution');
            dispatch({
                type: FETCH_REQUEST_STATUS_DISTRIBUTION_SUCCESS,
                payload: response.data,
            });
        }
        catch (error) {
            console.error('Error fetching request status distribution:', error);
            dispatch({
                type: FETCH_REQUEST_STATUS_DISTRIBUTION_FAILURE,
                error: error.message || 'An error occurred while fetching request status distribution',
            });
        }
    };
};
