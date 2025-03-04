// src/screens/ProfileSetup/StartDateForm.tsx
import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';

const StartDateForm = ({ navigation }) => {
    const { formData, updateFormData } = useProfileSetupContext();
  const [startDate, setStartDate] = useState('');

  const handleNext = () => {
    updateFormData({ startDate });
    navigation.navigate('Completion');
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Set Your Diet Start Date</Text>
      <TextInput
        value={startDate}
        onChangeText={setStartDate}
        placeholder="e.g., SAT MAR 1, 2025"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Next" onPress={handleNext} color="#ff0000" />
    </View>
  );
};

export default StartDateForm;