// src/redux/reducers/requestStatusDistributionReducer.ts
import { FETCH_REQUEST_STATUS_DISTRIBUTION_REQUEST, FETCH_REQUEST_STATUS_DISTRIBUTION_SUCCESS, FETCH_REQUEST_STATUS_DISTRIBUTION_FAILURE, } from '../actions/requestStatusDistributionActions';
const initialState = {
    data: [],
    loading: false,
    error: null,
};
const requestStatusDistributionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST_STATUS_DISTRIBUTION_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_REQUEST_STATUS_DISTRIBUTION_SUCCESS:
            return { ...state, data: action.payload, loading: false, error: null };
        case FETCH_REQUEST_STATUS_DISTRIBUTION_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};
export default requestStatusDistributionReducer;
