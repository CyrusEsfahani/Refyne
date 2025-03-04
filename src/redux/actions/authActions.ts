// src/redux/actions/authActions.ts
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';

// Update your action interfaces to extend AnyAction so that they include an index signature:
export interface SetUserAction extends AnyAction {
  type: 'SET_USER';
  payload: {
    uid: string;
    email: string | null;
    profileComplete: boolean;
    // Allows extra keys from additional data (e.g. from Firestore)
    [key: string]: any;
  };
}

export interface ClearUserAction extends AnyAction {
  type: 'CLEAR_USER';
}

export type AuthAction = SetUserAction | ClearUserAction;

// Define the thunk action type
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AuthAction>;

// Action creators
export const setUser = (
  user: { uid: string; email: string | null; profileComplete: boolean } & Record<string, any>
): SetUserAction => ({
  type: 'SET_USER',
  payload: user,
});

export const clearUser = (): ClearUserAction => ({
  type: 'CLEAR_USER',
});

// Sign-in action (thunk)
export const signIn = (
  email: string,
  password: string
): AppThunk<Promise<void>> => async (dispatch: Dispatch<AuthAction>) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user as User;
    dispatch(setUser({ uid: user.uid, email: user.email, profileComplete: false }));
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
};

// Sign-up action (thunk)
export const signUp = (
  email: string,
  password: string
): AppThunk<Promise<void>> => async (dispatch: Dispatch<AuthAction>) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user as User;
    dispatch(setUser({ uid: user.uid, email: user.email, profileComplete: false }));
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error;
  }
};

// Logout action (thunk)
export const logout = (): AppThunk<Promise<void>> => async (dispatch: Dispatch<AuthAction>) => {
  try {
    await signOut(auth);
    dispatch(clearUser());
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
