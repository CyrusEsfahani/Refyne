// src/screens/ProfileSetupScreen.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileSetupProvider } from '../context/ProfileSetupContext';

import BodyFatForm from './ProfileSetup/BodyFatForm';
import MeasurementsForm from './ProfileSetup/MeasurementsForm';
import DietTypeForm from './ProfileSetup/DietTypeForm';
import FitnessGoalsForm from './ProfileSetup/FitnessGoalsForm';
import StartDateForm from './ProfileSetup/StartDateForm';
import CompletionScreen from './ProfileSetup/CompletionScreen';

const Stack = createStackNavigator();

const ProfileSetupScreen = () => {
  return (
    <ProfileSetupProvider>
      <Stack.Navigator
        initialRouteName="BodyFatForm"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="BodyFatForm" component={BodyFatForm} />
        <Stack.Screen name="MeasurementsForm" component={MeasurementsForm} />
        <Stack.Screen name="DietTypeForm" component={DietTypeForm} />
        <Stack.Screen name="FitnessGoalsForm" component={FitnessGoalsForm} />
        <Stack.Screen name="StartDateForm" component={StartDateForm} />
        <Stack.Screen name="CompletionScreen" component={CompletionScreen} />
      </Stack.Navigator>
    </ProfileSetupProvider>
  );
};

export default ProfileSetupScreen;
