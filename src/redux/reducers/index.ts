import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // other slices
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;