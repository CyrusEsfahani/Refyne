import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const signIn = (email: string, password: string) => async (dispatch: any) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch({
      type: 'SET_USER',
      payload: {
        uid: user.uid,
        email: user.email,
        // Add other serializable fields if needed (e.g., displayName, photoURL)
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUp = (email: string, password: string) => async (dispatch: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch({
      type: 'SET_USER',
      payload: {
        uid: user.uid,
        email: user.email,
        // Add other serializable fields if needed
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    await signOut(auth);
    dispatch({ type: 'CLEAR_USER' });
  } catch (error) {
    console.error(error);
    throw error;
  }
};