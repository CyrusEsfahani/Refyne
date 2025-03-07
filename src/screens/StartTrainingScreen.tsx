// src/screens/StartTrainingScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, SafeAreaView } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../services/firebase';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import CustomHeader from '../components/CustomHeader';

const db = getFirestore(app);

const StartTrainingScreen = () => {
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { uid } = useSelector((state: RootState) => state.auth);

  const handleFinish = () => {
    // Show feedback modal
    setShowModal(true);
  };

  const handleSubmitFeedback = async () => {
    // Optionally save feedback to Firestore
    if (uid) {
      const ref = collection(db, 'users', uid, 'feedback');
      await addDoc(ref, {
        sets,
        reps,
        feedback,
        timestamp: new Date().toISOString(),
      });
    }
    setShowModal(false);
    // reset fields
    setSets('');
    setReps('');
    setFeedback('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Start Training" />
      <View style={styles.container}>
        <Text style={styles.title}>Log Your Training</Text>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Sets:</Text>
          <TextInput
            style={styles.input}
            value={sets}
            onChangeText={setSets}
            keyboardType="numeric"
            placeholder="e.g. 3"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Reps (or Steps):</Text>
          <TextInput
            style={styles.input}
            value={reps}
            onChangeText={setReps}
            keyboardType="numeric"
            placeholder="e.g. 12"
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>

        {/* Feedback Modal */}
        <Modal visible={showModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Feedback</Text>
              <TextInput
                style={styles.modalInput}
                value={feedback}
                onChangeText={setFeedback}
                placeholder="How was your workout?"
                placeholderTextColor="#666"
                multiline
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={handleSubmitFeedback}>
                  <Text style={styles.modalButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#555' }]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default StartTrainingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputRow: {
    marginBottom: 16,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
    padding: 10,
    borderRadius: 6,
  },
  finishButton: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2c2c2e',
    width: '80%',
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    padding: 10,
    borderRadius: 6,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
