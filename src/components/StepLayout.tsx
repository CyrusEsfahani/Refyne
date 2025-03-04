// src/components/StepLayout.tsx
import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

interface StepLayoutProps {
  stepText: string;         // e.g. "STEP 1 OF 10"
  title: string;            // e.g. "Your details"
  children: ReactNode;      // The form fields/content
  buttonLabel: string;      // e.g. "Continue" or "Next"
  onPressButton: () => void;
  buttonDisabled?: boolean; // If the button should be disabled
}

const StepLayout: React.FC<StepLayoutProps> = ({
  stepText,
  title,
  children,
  buttonLabel,
  onPressButton,
  buttonDisabled = false,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <Text style={styles.stepText}>{stepText}</Text>
        <Text style={styles.title}>{title}</Text>

        {/* Main Content */}
        <View style={styles.content}>{children}</View>

        {/* Bottom Button */}
        <TouchableOpacity
          style={[styles.button, buttonDisabled && styles.buttonDisabled]}
          onPress={onPressButton}
          disabled={buttonDisabled}
        >
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StepLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  stepText: {
    marginTop: 10,
    color: '#999',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#ff0000',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
