interface AuthState {
    isLoggedIn: boolean;
    user: any;
    profileComplete: boolean;
  }
  
  const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    profileComplete: false,
  };
  
  export default function authReducer(state = initialState, action): AuthState {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
          profileComplete: action.payload.profileComplete || false,
        };
      case 'CLEAR_USER':
        return { ...state, isLoggedIn: false, user: null, profileComplete: false };
      default:
        return state;
    }
  }