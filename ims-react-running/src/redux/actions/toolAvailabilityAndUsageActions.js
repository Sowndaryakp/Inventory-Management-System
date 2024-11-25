// src/redux/actions/toolAvailabilityAndUsageActions.ts
import axios from 'axios';
export const FETCH_TOOL_AVAILABILITY_AND_USAGE_REQUEST = 'FETCH_TOOL_AVAILABILITY_AND_USAGE_REQUEST';
export const FETCH_TOOL_AVAILABILITY_AND_USAGE_SUCCESS = 'FETCH_TOOL_AVAILABILITY_AND_USAGE_SUCCESS';
export const FETCH_TOOL_AVAILABILITY_AND_USAGE_FAILURE = 'FETCH_TOOL_AVAILABILITY_AND_USAGE_FAILURE';
export const fetchToolAvailabilityAndUsage = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_TOOL_AVAILABILITY_AND_USAGE_REQUEST });
        try {
            const response = await axios.get('http://172.18.7.27:8000/analytics/tool_availability_and_usage');
            dispatch({
                type: FETCH_TOOL_AVAILABILITY_AND_USAGE_SUCCESS,
                payload: response.data,
            });
        }
        catch (error) {
            console.error('Error fetching tool availability and usage:', error);
            dispatch({
                type: FETCH_TOOL_AVAILABILITY_AND_USAGE_FAILURE,
                error: error.message || 'An error occurred while fetching tool availability and usage',
            });
        }
    };
};
