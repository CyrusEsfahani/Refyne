import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles';

const DietHomeScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Diet</Text>
      <Text>Your personalized diet plan is being generated...</Text>
    </View>
  );
};

export default DietHomeScreen;