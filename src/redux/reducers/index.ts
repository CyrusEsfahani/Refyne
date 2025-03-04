import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';

// Define the RootState interface by combining all reducer states
export interface RootState {
  auth: AuthState;
  // Add other reducers here (e.g., profile, settings)
  // profile: ProfileState;
  // settings: SettingsState;
}

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;