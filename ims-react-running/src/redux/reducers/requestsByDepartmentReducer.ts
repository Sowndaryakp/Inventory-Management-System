// src/redux/reducers/requestsByDepartmentReducer.ts

import {
    FETCH_REQUESTS_BY_DEPARTMENT_REQUEST,
    FETCH_REQUESTS_BY_DEPARTMENT_SUCCESS,
    FETCH_REQUESTS_BY_DEPARTMENT_FAILURE,
  } from '../actions/requestsByDepartmentActions';
  
  interface RequestsByDepartmentState {
    data: { department_name: string; status: string; count: number }[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: RequestsByDepartmentState = {
    data: [],
    loading: false,
    error: null,
  };
  
  const requestsByDepartmentReducer = (
    state = initialState,
    action: { type: string; payload?: any; error?: string }
  ): RequestsByDepartmentState => {
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
  