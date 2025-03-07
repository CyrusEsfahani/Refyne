// src/screens/ProfileSetup/CompletionScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';
import { setUser } from '../../redux/actions/authActions';
import type { AppDispatch } from '../../redux/store';
import StepLayout from '../../components/StepLayout';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../../services/firebase';
import type { RootState } from '../../redux/store';

const CompletionScreen = () => {
  const { formData } = useProfileSetupContext();
  const dispatch = useDispatch<AppDispatch>();
  const { uid } = useSelector((state: RootState) => state.auth);

  const handleSave = async () => {
    if (!uid) {
      console.warn('User not logged in');
      return;
    }
    try {
      const db = getFirestore(app);
      // Save (merge) profile data to Firestore under users/{uid}
      await setDoc(
        doc(db, 'users', uid),
        {
          bodyFat: formData.bodyFat,
          chest: formData.chest,
          arms: formData.arms,
          waist: formData.waist,
          dietType: formData.dietType,
          fitnessGoal: formData.fitnessGoal,
          startDate: formData.startDate,
          profileComplete: true,
        },
        { merge: true }
      );
      // Update Redux state to mark profile as complete
      dispatch(setUser({ ...formData, profileComplete: true }));
      console.log('Profile data saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
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
