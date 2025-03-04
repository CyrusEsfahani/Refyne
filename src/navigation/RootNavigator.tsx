import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../services/firebase'; // Import the app from your config
import { setUser, clearUser } from '../redux/actions/authActions';
import OnboardingNavigator from './OnboardingNavigator';
import MainNavigator from './MainNavigator';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import type { RootState, AppDispatch } from '../redux/store';

// Create references to the Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export type RootStackParamList = {
  Onboarding: undefined;
  ProfileSetup: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, profileComplete } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          dispatch(setUser({
            uid: user.uid,
            email: user.email,
            profileComplete: data?.profileComplete || false,
          }));
        } else {
          dispatch(setUser({
            uid: user.uid,
            email: user.email,
            profileComplete: false,
          }));
        }
      } else {
        dispatch(clearUser());
      }
    });

    return unsubscribe; // Stop listening on unmount
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : !profileComplete ? (
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
