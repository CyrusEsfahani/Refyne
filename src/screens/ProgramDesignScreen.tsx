import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../services/firebase';
import type { RootState } from '../redux/store';
import { exerciseAPIOptions } from '../services/exerciseAPI';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string | null;
  target: string;
}

const db = getFirestore(app);
const muscleGroups = [
  'chest',
  'back',
  'shoulders',
  'upper arms',
  'lower arms',
  'upper legs',
  'lower legs',
  'waist',
];

const ProgramDesignScreen = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string>('chest');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [workoutName, setWorkoutName] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { uid } = useSelector((state: RootState) => state.auth);

  // Fetch exercises when muscle group changes
  useEffect(() => {
    fetchExercisesByMuscle(selectedMuscle);
  }, [selectedMuscle]);

  const fetchExercisesByMuscle = useCallback(async (muscle: string) => {
    if (!muscle) return;
    
    try {
      setLoading(true);
      const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${muscle}`;
      const response = await fetch(url, exerciseAPIOptions);
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      const desiredEquipment = ['cable', 'barbell', 'dumbbell', 'machine'];
      
      const filteredExercises = data
        .filter((exercise: Exercise) =>
          desiredEquipment.includes(exercise.equipment.toLowerCase()) &&
          exercise.gifUrl
        )
        .slice(0, 20); // Limit to prevent performance issues
      
      setExercises(filteredExercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      Alert.alert('Error', 'Failed to fetch exercises. Please try again.');
      setExercises([]); // Clear exercises on error
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleSelectExercise = useCallback((exercise: Exercise) => {
    setSelectedExercises((prev) =>
      prev.find((ex) => ex.id === exercise.id)
        ? prev.filter((ex) => ex.id !== exercise.id)
        : [...prev, exercise]
    );
  }, []);

  const saveWorkout = useCallback(async () => {
    if (!uid) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }
    
    if (!workoutName.trim()) {
      Alert.alert('Error', 'Please provide a workout name.');
      return;
    }
    
    if (selectedExercises.length === 0) {
      Alert.alert('Error', 'Please select at least one exercise.');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const workoutId = `${workoutName.trim()}_${Date.now()}`;
      const workoutDocRef = doc(db, 'users', uid, 'workouts', workoutId);

      // Format date for calendar display
      const workoutDate = selectedDate.toISOString();
      const formattedDate = workoutDate.split('T')[0]; // Gets YYYY-MM-DD format

      const workoutData = {
        id: workoutId,
        name: workoutName.trim(),
        muscleGroup: selectedMuscle,
        exercises: selectedExercises.map((ex) => ({
          id: ex.id,
          name: ex.name,
          equipment: ex.equipment,
          target: ex.target,
        })),
        workoutDate: workoutDate,
        calendarDate: formattedDate, // Add formatted date for calendar
        createdAt: new Date().toISOString(),
        completed: false,
      };

      // Save to Firestore workouts collection
      await setDoc(workoutDocRef, workoutData);

      // Update user profile with the new workout
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Update workouts array
        const updatedWorkouts = [...(userData.workouts || []), workoutData];
        
        // Update calendar events
        const calendarEvents = userData.calendarEvents || {};
        if (!calendarEvents[formattedDate]) {
          calendarEvents[formattedDate] = [];
        }
        calendarEvents[formattedDate].push({
          id: workoutId,
          name: workoutName.trim(),
          type: 'workout',
          muscleGroup: selectedMuscle
        });
        
        // Update both collections in Firestore
        await updateDoc(userDocRef, { 
          workouts: updatedWorkouts,
          calendarEvents: calendarEvents
        });
      } else {
        // If user doc doesn't exist, create it with the workout and calendar event
        const calendarEvents = {};
        calendarEvents[formattedDate] = [{
          id: workoutId,
          name: workoutName.trim(),
          type: 'workout',
          muscleGroup: selectedMuscle
        }];
        
        await setDoc(userDocRef, { 
          workouts: [workoutData],
          calendarEvents: calendarEvents
        });
      }

      Alert.alert('Success', 'Workout saved successfully and added to your profile and calendar!');
      
      // Reset form after successful save
      setWorkoutName('');
      setSelectedExercises([]);
    } catch (error) {
      console.error('Error saving workout:', error);
      Alert.alert('Error', 'Failed to save workout. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [uid, workoutName, selectedExercises, selectedDate, selectedMuscle]);

  // Handle date picker changes
  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (date) {
      setSelectedDate(date);
    }
  };

  // Muscle group selection component
  const renderMuscleGroups = () => (
    <FlatList
      data={muscleGroups}
      numColumns={2}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.muscleButton,
            item === selectedMuscle && styles.selectedMuscleButton,
          ]}
          onPress={() => setSelectedMuscle(item)}
        >
          <Text
            style={[
              styles.muscleButtonText,
              item === selectedMuscle && styles.selectedMuscleButtonText,
            ]}
          >
            {item.toUpperCase()}
          </Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.muscleGrid}
      scrollEnabled={false}
    />
  );

  // Exercise item renderer
  const renderExerciseItem = ({ item }: { item: Exercise }) => {
    const isSelected = selectedExercises.some((ex) => ex.id === item.id);
    
    return (
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <TouchableOpacity
          style={[styles.exerciseItem, isSelected && styles.selectedItem]}
          onPress={() => toggleSelectExercise(item)}
          activeOpacity={0.7}
        >
          {item.gifUrl ? (
            <Image
              source={{ uri: item.gifUrl }}
              style={styles.exerciseIcon}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.exerciseIcon}>
              <Text style={styles.noImageText}>No Image</Text>
            </View>
          )}
          <View style={styles.exerciseDetails}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseDetail}>Equipment: {item.equipment}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Form inputs for workout details
  const renderWorkoutForm = () => (
    <View style={styles.workoutContainer}>
      <TextInput
        style={styles.input}
        value={workoutName}
        onChangeText={setWorkoutName}
        placeholder="Workout Name (e.g., Chest Blast)"
        placeholderTextColor="#ccc"
        editable={!isSaving}
        autoCapitalize="sentences"
      />
      
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
        disabled={isSaving}
      >
        <Text style={styles.dateButtonText}>
          Date: {selectedDate.toDateString()}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.saveButton,
          (!workoutName.trim() || selectedExercises.length === 0 || isSaving) && 
            styles.saveButtonDisabled,
        ]}
        onPress={saveWorkout}
        disabled={!workoutName.trim() || selectedExercises.length === 0 || isSaving}
        activeOpacity={0.7}
      >
        {isSaving ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Workout</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Build Your Plan</Text>
        <Text style={styles.subHeader}>
          Select exercises for your {selectedMuscle} workout
        </Text>

        {/* Muscle Group Selection */}
        {renderMuscleGroups()}
        
        <View style={styles.divider} />

        {/* Exercise List */}
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#ff0000" />
          </View>
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderExerciseItem}
            contentContainerStyle={styles.listContent}
            removeClippedSubviews={true} // Performance optimization
            initialNumToRender={6} // Performance optimization
            maxToRenderPerBatch={10} // Performance optimization
            windowSize={5} // Performance optimization
            ListEmptyComponent={
              <Text style={styles.emptyText}>No exercises found for this muscle group.</Text>
            }
            ListFooterComponent={renderWorkoutForm()}
          />
        )}

        {/* Date Picker - Platform specific implementation */}
        {showDatePicker && (
          Platform.OS === 'ios' ? (
            <Modal
              visible={showDatePicker}
              transparent
              animationType="slide"
              onRequestClose={() => setShowDatePicker(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={onDateChange}
                  />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.closeButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#1c1c1e' 
  },
  container: { 
    flex: 1 
  },
  header: { 
    fontSize: 22, 
    color: '#fff', 
    fontWeight: 'bold', 
    marginBottom: 4, 
    paddingHorizontal: 16,
    paddingTop: 10
  },
  subHeader: { 
    fontSize: 16, 
    color: '#ccc', 
    marginBottom: 12, 
    paddingHorizontal: 16 
  },
  muscleGrid: { 
    justifyContent: 'space-between', 
    paddingHorizontal: 8 
  },
  muscleButton: {
    flex: 1,
    backgroundColor: '#2c2c2e',
    padding: 12,
    borderRadius: 8,
    margin: 6,
    alignItems: 'center',
  },
  selectedMuscleButton: { 
    backgroundColor: '#ff0000' 
  },
  muscleButtonText: { 
    color: '#fff', 
    fontWeight: '600' 
  },
  selectedMuscleButtonText: { 
    color: '#fff' 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#444', 
    marginVertical: 10 
  },
  listContent: { 
    paddingBottom: 20, 
    paddingHorizontal: 16 
  },
  exerciseItem: {
    flexDirection: 'row',
    backgroundColor: '#2c2c2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  selectedItem: { 
    borderWidth: 2, 
    borderColor: '#ff0000' 
  },
  exerciseIcon: {
    width: 80,
    height: 80,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3c3c3e',
    borderRadius: 8,
  },
  exerciseDetails: {
    flex: 1,
  },
  noImageText: { 
    color: '#ccc', 
    fontSize: 12, 
    textAlign: 'center' 
  },
  exerciseName: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600',
    marginBottom: 4
  },
  exerciseDetail: { 
    color: '#ccc', 
    fontSize: 14 
  },
  workoutContainer: {
    paddingVertical: 16,
    backgroundColor: '#1c1c1e',
    borderTopWidth: 1,
    borderTopColor: '#444',
    marginTop: 16
  },
  input: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  dateButton: {
    backgroundColor: '#2c2c2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  dateButtonText: { 
    color: '#fff', 
    fontSize: 16 
  },
  saveButton: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: { 
    backgroundColor: '#555' 
  },
  saveButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#1c1c1e',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    backgroundColor: '#ff0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: { 
    color: '#fff', 
    fontSize: 16,
    fontWeight: '600'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    color: '#ccc',
    textAlign: 'center',
    padding: 20
  }
});

export default ProgramDesignScreen;