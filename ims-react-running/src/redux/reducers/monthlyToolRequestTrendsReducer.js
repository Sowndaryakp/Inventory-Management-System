import { FETCH_MONTHLY_TOOL_REQUEST_TRENDS_REQUEST, FETCH_MONTHLY_TOOL_REQUEST_TRENDS_SUCCESS, FETCH_MONTHLY_TOOL_REQUEST_TRENDS_FAILURE, } from '../actions/monthlyToolRequestTrendsActions';
const initialState = {
    data: [],
    loading: false,
    error: null,
};
const monthlyToolRequestTrendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MONTHLY_TOOL_REQUEST_TRENDS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_MONTHLY_TOOL_REQUEST_TRENDS_SUCCESS:
            return { ...state, data: action.payload, loading: false, error: null };
        case FETCH_MONTHLY_TOOL_REQUEST_TRENDS_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};
export default monthlyToolRequestTrendsReducer;
