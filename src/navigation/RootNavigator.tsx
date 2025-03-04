import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth, db } from '../services/firebase';
import { setUser, clearUser } from '../redux/actions/authActions';
import OnboardingNavigator from './OnboardingNavigator';
import MainNavigator from './MainNavigator';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Onboarding: undefined;
  ProfileSetup: undefined;
  Main: undefined;
};

const RootNavigator = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const profileComplete = useSelector((state: any) => state.auth.profileComplete);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          const data = userDoc.data();
          dispatch(setUser({ uid: user.uid, email: user.email, profileComplete: data.profileComplete }));
        } else {
          dispatch(setUser({ uid: user.uid, email: user.email, profileComplete: false }));
        }
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
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