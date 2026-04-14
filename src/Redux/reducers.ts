// src/Redux/reducers.ts
import { combineReducers } from 'redux';
import authReducer from './auth/reducers'; // ✅ make sure this is imported

const rootReducer = combineReducers({
  auth: authReducer, // ✅ key must match what you use in selectors
});

export default rootReducer;