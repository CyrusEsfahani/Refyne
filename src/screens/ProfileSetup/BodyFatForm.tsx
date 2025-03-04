// src/screens/ProfileSetup/BodyFatForm.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';
import StepLayout from '../../components/StepLayout';

type RootStackParamList = {
  BodyFatForm: undefined;
  MeasurementsForm: undefined; // Next step
};

type BodyFatFormNavigationProp = StackNavigationProp<RootStackParamList, 'BodyFatForm'>;

const BodyFatForm = ({ navigation }: { navigation: BodyFatFormNavigationProp }) => {
  const { formData, updateFormData } = useProfileSetupContext();
  const [selectedOption, setSelectedOption] = useState<string>(formData.bodyFat || '');

  const handleSelection = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    updateFormData({ bodyFat: selectedOption });
    navigation.navigate('MeasurementsForm');
  };

  const options = ['< 15%', '15-22%', '22-30%', '> 30%'];

  return (
    <StepLayout
      stepText="STEP 1 OF 6"
      title="Your body fat %"
      buttonLabel="Set your body fat %"
      onPressButton={handleNext}
      buttonDisabled={!selectedOption}
    >
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionBox,
              selectedOption === option && styles.selectedOptionBox,
            ]}
            onPress={() => handleSelection(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </StepLayout>
  );
};

export default BodyFatForm;

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionBox: {
    width: '47%',
    height: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedOptionBox: {
    borderColor: '#ff0000',
    backgroundColor: '#ffe5e5',
  },
  selectedOptionText: {
    color: '#ff0000',
  },
});
