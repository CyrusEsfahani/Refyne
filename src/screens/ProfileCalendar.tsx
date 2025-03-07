import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { app } from '../services/firebase';
import type { RootState } from '../redux/store';

interface WorkoutDoc {
  workoutDate?: string;
  name: string;
  muscleGroup: string;
  exercises: Array<{ id: string; name: string; equipment?: string; target?: string }>;
  completed?: boolean;
}

const ProfileCalendar = () => {
  const { uid } = useSelector((state: RootState) => state.auth);
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  const [workouts, setWorkouts] = useState<Record<string, WorkoutDoc>>({});
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutDoc | null>(null);
  const [showModal, setShowModal] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    if (uid) fetchWorkouts();
  }, [uid]);

  const fetchWorkouts = async () => {
    try {
      const colRef = collection(db, 'users', uid, 'workouts');
      const snapshot = await getDocs(colRef);
      const datesMarked: Record<string, any> = {};
      const workoutData: Record<string, WorkoutDoc> = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as WorkoutDoc;
        if (data.workoutDate) {
          const iso = data.workoutDate.split('T')[0];
          workoutData[iso] = data;
          datesMarked[iso] = {
            marked: true,
            dotColor: getColorForMuscleGroup(data.muscleGroup),
            selected: data.completed,
            selectedColor: data.completed ? 'green' : undefined,
          };
        }
      });
      setWorkouts(workoutData);
      setMarkedDates(datesMarked);
    } catch (error) {
      console.error('Error fetching workouts for calendar:', error);
    }
  };

  const getColorForMuscleGroup = (muscleGroup: string) => {
    const colorMap: Record<string, string> = {
      chest: '#ff0000',        // Red
      back: '#00ff00',         // Green
      shoulders: '#0000ff',    // Blue
      'upper arms': '#ffff00', // Yellow
      'lower arms': '#ff00ff', // Magenta
      'upper legs': '#00ffff', // Cyan
      'lower legs': '#ffa500', // Orange
      waist: '#800080',        // Purple
    };
    return colorMap[muscleGroup.toLowerCase()] || '#ffffff'; // Default to white
  };

  const toggleCompletion = async (day: string) => {
    const workout = workouts[day];
    if (!workout) return;

    const workoutDocRef = doc(db, 'users', uid, 'workouts', `${workout.name}_${new Date(workout.workoutDate || '').getTime()}`);
    const newCompleted = !workout.completed;
    await updateDoc(workoutDocRef, { completed: newCompleted });
    setWorkouts((prev) => ({
      ...prev,
      [day]: { ...prev[day], completed: newCompleted },
    }));
    setMarkedDates((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        selected: newCompleted,
        selectedColor: newCompleted ? 'green' : undefined,
      },
    }));
  };

  const handleDayPress = (day: DateData) => {
    const workout = workouts[day.dateString];
    if (workout) {
      setSelectedWorkout(workout);
      setShowModal(true);
    } else {
      toggleCompletion(day.dateString); // Toggle if no workout details to show
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Workout Calendar</Text>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          backgroundColor: '#1c1c1e',
          calendarBackground: '#1c1c1e',
          dayTextColor: '#fff',
          monthTextColor: '#fff',
          textDisabledColor: '#555',
          arrowColor: 'white',
        }}
      />
      {selectedWorkout && showModal && (
        <Modal visible={showModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedWorkout.name}</Text>
              <Text style={styles.modalSubtitle}>Muscle Group: {selectedWorkout.muscleGroup}</Text>
              <Text style={styles.modalSubtitle}>Date: {selectedWorkout.workoutDate?.split('T')[0]}</Text>
              {selectedWorkout.exercises.map((ex) => (
                <Text key={ex.id} style={styles.modalExercise}>
                  • {ex.name} ({ex.equipment || 'N/A'})
                </Text>
              ))}
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    padding: 16,
    flex: 1,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#1c1c1e',
    padding: 20,
    borderRadius: 8,
    margin: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 10,
  },
  modalExercise: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 5,
  },
  closeButtonText: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ProfileCalendar;