// src/screens/ProfileSetup/FitnessGoalsForm.tsx
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';

const FitnessGoalsForm = ({ navigation }) => {
    const { formData, updateFormData } = useProfileSetupContext();

  const handleSelect = (goal) => {
    updateFormData({ fitnessGoal: goal });
    navigation.navigate('StartDate');
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Choose Your Fitness Goal</Text>
      <Button
        title="Highest Success"
        onPress={() => handleSelect('highestSuccess')}
        color="#ff0000"
      />
      <View style={{ height: 10 }} />
      <Button
        title="Slow and Steady"
        onPress={() => handleSelect('slowAndSteady')}
        color="#ff0000"
      />
      <View style={{ height: 10 }} />
      <Button
        title="Custom Goals"
        onPress={() => handleSelect('custom')}
        color="#ff0000"
      />
    </View>
  );
};

export default FitnessGoalsForm;