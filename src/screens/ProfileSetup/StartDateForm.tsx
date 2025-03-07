// src/screens/ProfileSetup/StartDateForm.tsx
import React, { useState } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  // If formData.startDate exists, parse it; otherwise default to today's date
  const [date, setDate] = useState<Date>(
    formData.startDate ? new Date(formData.startDate) : new Date()
  );
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    // For iOS, the picker remains open until the user taps Done.
    // For Android, the picker closes immediately on selection.
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const openPicker = () => {
    setShowPicker(true);
  };

  const handleNext = () => {
    // Save date in ISO format or as a string
    updateFormData({ startDate: date.toISOString() });
    navigation.navigate('CompletionScreen');
  };

  return (
    <StepLayout
      stepText="STEP 5 OF 6"
      title="Choose Your Start Date"
      buttonLabel="Continue"
      onPressButton={handleNext}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Selected Date:</Text>
        <Text style={styles.value}>{date.toDateString()}</Text>

        <Button title="Pick a Date" onPress={openPicker} />

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleChange}
          />
        )}
      </View>
    </StepLayout>
  );
};

export default StartDateForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
});
