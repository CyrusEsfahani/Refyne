// src/screens/ProfileSetup/MeasurementsForm.tsx
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';

const MeasurementsForm = ({ navigation }) => {
    const { formData, updateFormData } = useProfileSetupContext();
  const [measurements, setMeasurements] = useState({
    chest: '',
    arms: '',
    waist: '',
  });

  const unitLabel = formData.units === 'imperial' ? 'inches' : 'cm';

  const handleNext = () => {
    updateFormData(measurements);
    navigation.navigate('DietType');
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Enter Your Measurements</Text>
      <Text>Chest ({unitLabel})</Text>
      <TextInput
        value={measurements.chest}
        onChangeText={(text) => setMeasurements({ ...measurements, chest: text })}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Text>Arms ({unitLabel})</Text>
      <TextInput
        value={measurements.arms}
        onChangeText={(text) => setMeasurements({ ...measurements, arms: text })}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Text>Waist ({unitLabel})</Text>
      <TextInput
        value={measurements.waist}
        onChangeText={(text) => setMeasurements({ ...measurements, waist: text })}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Next" onPress={handleNext} color="#ff0000" />
    </View>
  );
};

export default MeasurementsForm;