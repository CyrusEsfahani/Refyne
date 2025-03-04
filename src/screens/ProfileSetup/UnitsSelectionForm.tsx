// src/screens/ProfileSetup/UnitsSelectionForm.tsx
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';

const UnitsSelectionForm = ({ navigation }) => {
    const { formData, updateFormData } = useProfileSetupContext();
    
    const handleSelect = (units: string) => { // Specify 'string' or your specific type
        updateFormData({ units });
        navigation.navigate('NextScreen');
      };
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Select Measurement Units</Text>
      <Button
        title="Imperial (lbs, inches)"
        onPress={() => handleSelect('imperial')}
        color="#ff0000"
      />
      <View style={{ height: 10 }} />
      <Button
        title="Metric (kg, cm)"
        onPress={() => handleSelect('metric')}
        color="#ff0000"
      />
    </View>
  );
};

export default UnitsSelectionForm;