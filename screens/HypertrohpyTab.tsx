// screens/HypertrophyTab.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProgramsScreen from './ProgramsScreen';
import ProgramDetailScreen from './ProgramDetailScreen';

const Stack = createStackNavigator();

export default function HypertrophyTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#FFFFFF',
      }}
    >
      <Stack.Screen name="Programs" component={ProgramsScreen} options={{ title: 'Training Programs' }} />
      <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} options={{ title: 'Program Details' }} />
    </Stack.Navigator>
  );
}