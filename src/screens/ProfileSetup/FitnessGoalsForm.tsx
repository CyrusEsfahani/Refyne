// src/screens/ProfileSetup/FitnessGoalsForm.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';
import StepLayout from '../../components/StepLayout';

type RootStackParamList = {
  FitnessGoalsForm: undefined;
  StartDateForm: undefined;
};

type FitnessGoalsFormNavigationProp = StackNavigationProp<RootStackParamList, 'FitnessGoalsForm'>;

const FitnessGoalsForm = ({ navigation }: { navigation: FitnessGoalsFormNavigationProp }) => {
  const { formData, updateFormData } = useProfileSetupContext();
  const [selectedGoal, setSelectedGoal] = useState<string>(formData.fitnessGoal || '');

  const handleSelection = (goal: string) => {
    setSelectedGoal(goal);
  };

  const handleNext = () => {
    updateFormData({ fitnessGoal: selectedGoal });
    navigation.navigate('StartDateForm');
  };

  const goalsOptions = [
    { label: 'HIGHEST SUCCESS', value: 'highestSuccess', description: 'Lose 11 pounds in 8 weeks.' },
    { label: 'SLOW AND STEADY', value: 'slowAndSteady', description: 'Lose 13 pounds in 12 weeks.' },
    { label: 'CUSTOM GOALS', value: 'custom', description: 'Define your own rate of progress.' },
  ];

  return (
    <StepLayout
      stepText="STEP 4 OF 6"
      title="Choose a diet goal"
      buttonLabel="Continue"
      onPressButton={handleNext}
      buttonDisabled={!selectedGoal}
    >
      <View style={styles.optionsContainer}>
        {goalsOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionBox,
              selectedGoal === option.value && styles.selectedOptionBox,
            ]}
            onPress={() => handleSelection(option.value)}
          >
            <Text
              style={[
                styles.optionLabel,
                selectedGoal === option.value && styles.selectedOptionText,
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

export default FitnessGoalsForm;

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
