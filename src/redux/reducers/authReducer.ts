interface User {
    uid: string;
    email: string;
    // Add other serializable fields as needed
  }
  
  interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
  }
  
  const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
  };
  
  export default function authReducer(state = initialState, action: any): AuthState {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, isLoggedIn: true, user: action.payload };
      case 'CLEAR_USER':
        return { ...state, isLoggedIn: false, user: null };
      default:
        return state;
    }
  }