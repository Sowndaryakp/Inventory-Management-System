// src/redux/reducers/mostRequestedToolsReducer.ts
import { FETCH_MOST_REQUESTED_TOOLS_REQUEST, FETCH_MOST_REQUESTED_TOOLS_SUCCESS, FETCH_MOST_REQUESTED_TOOLS_FAILURE, } from '../actions/mostRequestedToolsActions';
const initialState = {
    data: [],
    loading: false,
    error: null,
};
const mostRequestedToolsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOST_REQUESTED_TOOLS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_MOST_REQUESTED_TOOLS_SUCCESS:
            return { ...state, data: action.payload, loading: false, error: null };
        case FETCH_MOST_REQUESTED_TOOLS_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};
export default mostRequestedToolsReducer;
