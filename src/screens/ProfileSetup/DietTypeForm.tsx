// src/screens/ProfileSetup/DietTypeForm.tsx
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';

const DietTypeForm = ({ navigation }) => {
    const { formData, updateFormData } = useProfileSetupContext();

  const handleSelect = (dietType) => {
    updateFormData({ dietType });
    navigation.navigate('FitnessGoals');
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Choose a Diet Type</Text>
      <Button
        title="Fat Loss"
        onPress={() => handleSelect('fatLoss')}
        color="#ff0000"
      />
      <View style={{ height: 10 }} />
      <Button
        title="Maintenance"
        onPress={() => handleSelect('maintenance')}
        color="#ff0000"
      />
      <View style={{ height: 10 }} />
      <Button
        title="Muscle Gain"
        onPress={() => handleSelect('muscleGain')}
        color="#ff0000"
      />
    </View>
  );
};

export default DietTypeForm;