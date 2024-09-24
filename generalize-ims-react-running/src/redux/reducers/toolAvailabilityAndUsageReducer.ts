// src/redux/reducers/toolAvailabilityAndUsageReducer.ts

import {
    FETCH_TOOL_AVAILABILITY_AND_USAGE_REQUEST,
    FETCH_TOOL_AVAILABILITY_AND_USAGE_SUCCESS,
    FETCH_TOOL_AVAILABILITY_AND_USAGE_FAILURE,
  } from '../actions/toolAvailabilityAndUsageActions';
  
  interface ToolAvailabilityAndUsageState {
    data: { available: number; in_use: number };
    loading: boolean;
    error: string | null;
  }
  
  const initialState: ToolAvailabilityAndUsageState = {
    data: { available: 0, in_use: 0 },
    loading: false,
    error: null,
  };
  
  const toolAvailabilityAndUsageReducer = (
    state = initialState,
    action: { type: string; payload?: any; error?: string }
  ): ToolAvailabilityAndUsageState => {
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
  