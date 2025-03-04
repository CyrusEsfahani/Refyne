// src/screens/ProfileSetup/StartDateForm.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';
import StepLayout from '../../components/StepLayout';

type RootStackParamList = {
  StartDateForm: undefined;
  CompletionScreen: undefined;
};

type StartDateFormNavigationProp = StackNavigationProp<RootStackParamList, 'StartDateForm'>;

const StartDateForm = ({ navigation }: { navigation: StartDateFormNavigationProp }) => {
  const { formData, updateFormData } = useProfileSetupContext();
  const [startDate, setStartDate] = useState<string>(formData.startDate || '');

  const handleNext = () => {
    updateFormData({ startDate });
    navigation.navigate('CompletionScreen');
  };

  return (
    <StepLayout
      stepText="STEP 5 OF 6"
      title="Choose Your Start Date"
      buttonLabel="Continue"
      onPressButton={handleNext}
      buttonDisabled={!startDate}
    >
      <TextInput
        value={startDate}
        onChangeText={setStartDate}
        placeholder="YYYY-MM-DD"
        style={styles.input}
      />
    </StepLayout>
  );
};

export default StartDateForm;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
});
