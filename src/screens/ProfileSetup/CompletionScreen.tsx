// src/screens/ProfileSetup/CompletionScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';
import { setUser } from '../../redux/actions/authActions';
import type { AppDispatch } from '../../redux/store';
import StepLayout from '../../components/StepLayout';

const CompletionScreen = () => {
  const { formData } = useProfileSetupContext();
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = () => {
    // Mark profile as complete in Redux (or your DB)
    dispatch(setUser({ ...formData, profileComplete: true }));
    // RootNavigator should redirect to Main once profileComplete = true
  };

  return (
    <StepLayout
      stepText="STEP 6 OF 6"
      title="Review & Save"
      buttonLabel="Save"
      onPressButton={handleSave}
    >
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewText}>Body Fat: {formData.bodyFat}</Text>
        <Text style={styles.reviewText}>
          Measurements: Chest {formData.chest}, Arms {formData.arms}, Waist {formData.waist}
        </Text>
        <Text style={styles.reviewText}>Diet Type: {formData.dietType}</Text>
        <Text style={styles.reviewText}>Fitness Goal: {formData.fitnessGoal}</Text>
        <Text style={styles.reviewText}>Start Date: {formData.startDate}</Text>
      </View>
    </StepLayout>
  );
};

export default CompletionScreen;

const styles = StyleSheet.create({
  reviewContainer: {
    marginTop: 20,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
