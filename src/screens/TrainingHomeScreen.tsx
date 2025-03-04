import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles';

const TrainingHomeScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Training</Text>
      <Text>Your personalized workout plan is being generated...</Text>
    </View>
  );
};

export default TrainingHomeScreen;