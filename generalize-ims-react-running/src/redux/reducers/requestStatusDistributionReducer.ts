// src/redux/reducers/requestStatusDistributionReducer.ts

import {
    FETCH_REQUEST_STATUS_DISTRIBUTION_REQUEST,
    FETCH_REQUEST_STATUS_DISTRIBUTION_SUCCESS,
    FETCH_REQUEST_STATUS_DISTRIBUTION_FAILURE,
  } from '../actions/requestStatusDistributionActions';
  
  interface RequestStatusDistributionState {
    data: { status: string; count: number }[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: RequestStatusDistributionState = {
    data: [],
    loading: false,
    error: null,
  };
  
  const requestStatusDistributionReducer = (
    state = initialState,
    action: { type: string; payload?: any; error?: string }
  ): RequestStatusDistributionState => {
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
  