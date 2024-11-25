// src/redux/reducers/requestsByDepartmentReducer.ts
import { FETCH_REQUESTS_BY_DEPARTMENT_REQUEST, FETCH_REQUESTS_BY_DEPARTMENT_SUCCESS, FETCH_REQUESTS_BY_DEPARTMENT_FAILURE, } from '../actions/requestsByDepartmentActions';
const initialState = {
    data: [],
    loading: false,
    error: null,
};
const requestsByDepartmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUESTS_BY_DEPARTMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_REQUESTS_BY_DEPARTMENT_SUCCESS:
            return { ...state, data: action.payload, loading: false, error: null };
        case FETCH_REQUESTS_BY_DEPARTMENT_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};
export default requestsByDepartmentReducer;
