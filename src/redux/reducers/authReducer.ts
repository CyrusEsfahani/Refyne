import { Action } from 'redux'; // Or define a custom action type

// Define the AuthState interface
interface AuthState {
  isLoggedIn: boolean;
  user: any; // Replace with a specific User type if available
  profileComplete: boolean; // Added based on your RootNavigator usage
  uid?: string; 
}

// Initial state
const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  profileComplete: false,
  uid: undefined,
};

// Define a custom action type for your auth actions
interface AuthAction extends Action {
  type: string;
  payload?: {
    uid: string;
    email: string | null;
    profileComplete: boolean;
  };
}

export default function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload, isLoggedIn: true };
    case 'CLEAR_USER':
      return { ...initialState, isLoggedIn: false };
    default:
      return state;
  }
}

export { AuthState }; 