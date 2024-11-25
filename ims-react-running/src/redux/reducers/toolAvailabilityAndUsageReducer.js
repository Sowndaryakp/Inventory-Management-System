// src/redux/reducers/toolAvailabilityAndUsageReducer.ts
import { FETCH_TOOL_AVAILABILITY_AND_USAGE_REQUEST, FETCH_TOOL_AVAILABILITY_AND_USAGE_SUCCESS, FETCH_TOOL_AVAILABILITY_AND_USAGE_FAILURE, } from '../actions/toolAvailabilityAndUsageActions';
const initialState = {
    data: { available: 0, in_use: 0 },
    loading: false,
    error: null,
};
const toolAvailabilityAndUsageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOOL_AVAILABILITY_AND_USAGE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_TOOL_AVAILABILITY_AND_USAGE_SUCCESS:
            return { ...state, data: action.payload, loading: false, error: null };
        case FETCH_TOOL_AVAILABILITY_AND_USAGE_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};
export default toolAvailabilityAndUsageReducer;
