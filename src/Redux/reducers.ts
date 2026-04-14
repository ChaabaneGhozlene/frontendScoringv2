// src/Redux/reducers.ts
import { combineReducers } from 'redux';
import authReducer from './auth/reducers'; // ✅ make sure this is imported
import themeConfigReducer from '../store/themeConfigSlice'; // ✅ ajoute ceci
const rootReducer = combineReducers({
  auth: authReducer, // ✅ key must match what you use in selectors
    themeConfig: themeConfigReducer, // ✅ ajoute ceci

});

export default rootReducer;