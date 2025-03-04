import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const setUser = (user: any) => ({
  type: 'SET_USER',
  payload: user,
});

export const clearUser = () => ({
  type: 'CLEAR_USER',
});

export const signIn = (email: string, password: string) => async (dispatch: any) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch(setUser({ uid: user.uid, email: user.email, profileComplete: false }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUp = (email: string, password: string) => async (dispatch: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch(setUser({ uid: user.uid, email: user.email, profileComplete: false }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    await signOut(auth);
    dispatch(clearUser());
  } catch (error) {
    console.error(error);
    throw error;
  }
};