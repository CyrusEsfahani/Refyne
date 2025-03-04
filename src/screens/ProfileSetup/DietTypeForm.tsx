// src/screens/ProfileSetup/DietTypeForm.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';
import StepLayout from '../../components/StepLayout';

type RootStackParamList = {
  DietTypeForm: undefined;
  FitnessGoalsForm: undefined;
};

type DietTypeFormNavigationProp = StackNavigationProp<RootStackParamList, 'DietTypeForm'>;

const DietTypeForm = ({ navigation }: { navigation: DietTypeFormNavigationProp }) => {
  const { formData, updateFormData } = useProfileSetupContext();
  const [selectedDiet, setSelectedDiet] = useState<string>(formData.dietType || '');

  const handleSelection = (diet: string) => {
    setSelectedDiet(diet);
  };

  const handleNext = () => {
    updateFormData({ dietType: selectedDiet });
    navigation.navigate('FitnessGoalsForm');
  };

  const dietOptions = [
    { label: 'FAT LOSS', value: 'fatLoss', description: 'Lose fat while preserving muscle.' },
    { label: 'MAINTENANCE', value: 'maintenance', description: 'Stay at your current weight.' },
    { label: 'MUSCLE GAIN', value: 'muscleGain', description: 'Gain muscle while adding weight.' },
  ];

  return (
    <StepLayout
      stepText="STEP 3 OF 6"
      title="Choose a diet type"
      buttonLabel="Continue"
      onPressButton={handleNext}
      buttonDisabled={!selectedDiet}
    >
      <View style={styles.optionsContainer}>
        {dietOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionBox,
              selectedDiet === option.value && styles.selectedOptionBox,
            ]}
            onPress={() => handleSelection(option.value)}
          >
            <Text
              style={[
                styles.optionLabel,
                selectedDiet === option.value && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
            <Text style={styles.optionDescription}>{option.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </StepLayout>
  );
};

export default DietTypeForm;

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'column',
  },
  optionBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
  },
  selectedOptionBox: {
    borderColor: '#ff0000',
    backgroundColor: '#ffe5e5',
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: '#555',
  },
  selectedOptionText: {
    color: '#ff0000',
  },
});
