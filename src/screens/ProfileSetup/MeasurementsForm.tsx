// src/screens/ProfileSetup/MeasurementsForm.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';
import StepLayout from '../../components/StepLayout';

type RootStackParamList = {
  MeasurementsForm: undefined;
  DietTypeForm: undefined;
};

type MeasurementsFormNavigationProp = StackNavigationProp<RootStackParamList, 'MeasurementsForm'>;

interface Measurements {
  chest: string;
  arms: string;
  waist: string;
}

const MeasurementsForm = ({ navigation }: { navigation: MeasurementsFormNavigationProp }) => {
  const { formData, updateFormData } = useProfileSetupContext();
  const [measurements, setMeasurements] = useState<Measurements>({
    chest: formData.chest || '12',
    arms: formData.arms || '12',
    waist: formData.waist || '12',
  });

  const numericOptions = Array.from({ length: 60 }, (_, i) => (i + 1).toString());

  const handleNext = () => {
    updateFormData(measurements);
    navigation.navigate('DietTypeForm');
  };

  return (
    <StepLayout
      stepText="STEP 2 OF 6"
      title="Your Measurements"
      buttonLabel="Continue"
      onPressButton={handleNext}
    >
      <View style={styles.labelRow}>
        <Text style={styles.label}>Chest</Text>
        <Picker
          selectedValue={measurements.chest}
          style={styles.picker}
          onValueChange={(itemValue) => setMeasurements({ ...measurements, chest: itemValue })}
        >
          {numericOptions.map((val) => (
            <Picker.Item key={val} label={val} value={val} />
          ))}
        </Picker>
      </View>

      <View style={styles.labelRow}>
        <Text style={styles.label}>Arms</Text>
        <Picker
          selectedValue={measurements.arms}
          style={styles.picker}
          onValueChange={(itemValue) => setMeasurements({ ...measurements, arms: itemValue })}
        >
          {numericOptions.map((val) => (
            <Picker.Item key={val} label={val} value={val} />
          ))}
        </Picker>
      </View>

      <View style={styles.labelRow}>
        <Text style={styles.label}>Waist</Text>
        <Picker
          selectedValue={measurements.waist}
          style={styles.picker}
          onValueChange={(itemValue) => setMeasurements({ ...measurements, waist: itemValue })}
        >
          {numericOptions.map((val) => (
            <Picker.Item key={val} label={val} value={val} />
          ))}
        </Picker>
      </View>
    </StepLayout>
  );
};

export default MeasurementsForm;

const styles = StyleSheet.create({
  labelRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
});
