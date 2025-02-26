// screens/ProgramDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { TrainingProgram, Workout } from '../types';

export default function ProgramDetailScreen({ route }) {
  const { programId } = route.params;
  const [program, setProgram] = useState<TrainingProgram | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchProgram = async () => {
      const programDoc = await getDoc(doc(db, 'trainingPrograms', programId));
      if (programDoc.exists()) {
        const data = programDoc.data() as TrainingProgram;
        setProgram({ id: programDoc.id, ...data });
        const workoutDocs = await Promise.all(
          data.workouts.map(workoutId => getDoc(doc(db, 'workouts', workoutId)))
        );
        setWorkouts(workoutDocs.map(doc => ({ id: doc.id, ...doc.data() } as Workout)));
      }
    };
    fetchProgram();
  }, [programId]);

  if (!program) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{program.name}</Text>
      <Text style={styles.description}>{program.description}</Text>
      <FlatList
        data={workouts}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    paddingVertical: 10,
  },
});