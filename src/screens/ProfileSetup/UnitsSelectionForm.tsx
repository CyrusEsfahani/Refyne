import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProfileSetupContext } from '../../context/ProfileSetupContext';

// Define the navigation prop type based on your navigation structure
type RootStackParamList = {
  UnitsSelectionForm: undefined;
  NextScreen: undefined; // Adjust 'NextScreen' to the actual route name (e.g., 'MeasurementsForm')
};

// Type the navigation prop
type UnitsSelectionFormNavigationProp = StackNavigationProp<RootStackParamList, 'UnitsSelectionForm'>;

const UnitsSelectionForm = ({ navigation }: { navigation: UnitsSelectionFormNavigationProp }) => {
  const { formData, updateFormData } = useProfileSetupContext();

  const handleSelect = (units: string) => { // Already typed correctly
    updateFormData({ units });
    navigation.navigate('NextScreen'); // Adjust to the correct route name (e.g., 'MeasurementsForm')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Measurement Units</Text>
      <Button
        title="Imperial (lbs, inches)"
        onPress={() => handleSelect('imperial')}
        color="#ff0000"
      />
      <View style={styles.spacer} />
      <Button
        title="Metric (kg, cm)"
        onPress={() => handleSelect('metric')}
        color="#ff0000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  spacer: {
    height: 10,
  },
});

export default UnitsSelectionForm;