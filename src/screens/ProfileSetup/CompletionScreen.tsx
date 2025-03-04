// src/screens/ProfileSetup/CompletionScreen.tsx
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';
import { setUser } from '../../redux/actions/authActions'; // Adjust path as needed

const CompletionScreen = () => {
    const { formData, updateFormData } = useProfileSetupContext();
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      // Save formData to your backend or Firebase (example assumes Redux integration)
      dispatch(setUser({ ...formData, profileComplete: true }));
      // Navigation to Main screen handled by RootNavigator based on profileComplete
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Review Your Profile</Text>
      <Text>Units: {formData.units}</Text>
      <Text>Measurements: Chest {formData.chest}, Arms {formData.arms}, Waist {formData.waist}</Text>
      <Text>Diet Type: {formData.dietType}</Text>
      <Text>Fitness Goal: {formData.fitnessGoal}</Text>
      <Text>Start Date: {formData.startDate}</Text>
      <Button title="Save" onPress={handleSave} color="#ff0000" />
    </View>
  );
};

export default CompletionScreen;