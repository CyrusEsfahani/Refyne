// src/screens/TrainingHomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const TrainingHomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Training</Text>

        <Text style={styles.subHeader}>Design your program</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Build Your Plan</Text>
          <Text style={styles.cardDescription}>
            Choose your exercises and create a custom mesocycle.
          </Text>
        </TouchableOpacity>

        <Text style={styles.subHeader}>Start Training</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Workout Feedback</Text>
          <Text style={styles.cardDescription}>
            Log your sets, reps, and provide feedback to the app.
          </Text>
        </TouchableOpacity>

        <Text style={styles.subHeader}>Adapt & Grow</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Progression</Text>
          <Text style={styles.cardDescription}>
            Automatically adjust volume and intensity based on your performance.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TrainingHomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c1e', // dark background
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#2c2c2e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#ff0000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    color: '#ccc',
    fontSize: 14,
  },
});
