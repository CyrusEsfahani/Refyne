// src/navigation/TrainingNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrainingHomeScreen from '../screens/TrainingHomeScreen';
import ProgramDesignScreen from '../screens/ProgramDesignScreen';
import StartTrainingScreen from '../screens/StartTrainingScreen'; // <-- Import here

const Stack = createStackNavigator();

const TrainingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrainingHome" component={TrainingHomeScreen} />
      <Stack.Screen name="ProgramDesign" component={ProgramDesignScreen} />
      <Stack.Screen name="StartTraining" component={StartTrainingScreen} /> 
      {/* Add the new screen here */}
    </Stack.Navigator>
  );
};

export default TrainingNavigator;
