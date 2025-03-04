import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrainingHomeScreen from '../screens/TrainingHomeScreen';
import DietHomeScreen from '../screens/DietHomeScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Training" component={TrainingHomeScreen} />
    <Tab.Screen name="Diet" component={DietHomeScreen} />
  </Tab.Navigator>
);

export default MainNavigator;