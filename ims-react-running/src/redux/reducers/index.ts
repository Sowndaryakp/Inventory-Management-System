// src/redux/reducers/index.ts

import { combineReducers } from 'redux';
import monthlyToolRequestTrendsReducer from './monthlyToolRequestTrendsReducer';
import requestStatusDistributionReducer from './requestStatusDistributionReducer';
import toolAvailabilityAndUsageReducer from './toolAvailabilityAndUsageReducer';
import requestsByDepartmentReducer from './requestsByDepartmentReducer'; 
import mostRequestedToolsReducer from './mostRequestedToolsReducer';

const rootReducer = combineReducers({
  monthlyToolRequestTrends: monthlyToolRequestTrendsReducer,
  requestStatusDistribution: requestStatusDistributionReducer,
  toolAvailabilityAndUsage: toolAvailabilityAndUsageReducer,
  requestsByDepartment: requestsByDepartmentReducer, 
  mostRequestedTools: mostRequestedToolsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
