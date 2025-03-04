// src/screens/ProfileSetupScreen.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileSetupProvider } from '../context/ProfileSetupContext';
import UnitsSelectionForm from './ProfileSetup/UnitsSelectionForm';
import MeasurementsForm from './ProfileSetup/MeasurementsForm';
import DietTypeForm from './ProfileSetup/DietTypeForm';
import FitnessGoalsForm from './ProfileSetup/FitnessGoalsForm';
import StartDateForm from './ProfileSetup/StartDateForm';
import CompletionScreen from './ProfileSetup/CompletionScreen';

const Stack = createStackNavigator();

const steps = [
  { name: 'UnitsSelection', component: UnitsSelectionForm, title: 'Choose Units' },
  { name: 'Measurements', component: MeasurementsForm, title: 'Your Measurements' },
  { name: 'DietType', component: DietTypeForm, title: 'Choose a Diet Type' },
  { name: 'FitnessGoals', component: FitnessGoalsForm, title: 'Choose Your Goals' },
  { name: 'StartDate', component: StartDateForm, title: 'Set Start Date' },
  { name: 'Completion', component: CompletionScreen, title: 'Review and Save' },
];

const ProfileSetupScreen = () => {
  return (
    <ProfileSetupProvider>
      <Stack.Navigator
        initialRouteName="UnitsSelection"
        screenOptions={{ headerShown: true }}
      >
        {steps.map((step, index) => (
          <Stack.Screen
            key={step.name}
            name={step.name}
            component={step.component}
            options={{ headerTitle: `${step.title} (Step ${index + 1} of ${steps.length})` }}
          />
        ))}
      </Stack.Navigator>
    </ProfileSetupProvider>
  );
};

export default ProfileSetupScreen;