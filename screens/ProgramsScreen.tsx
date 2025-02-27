// screens/ProgramsScreen.tsx
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { TrainingProgram } from '../types';

export default function ProgramsScreen({ navigation }) {
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const querySnapshot = await getDocs(collection(db, 'trainingPrograms'));
      const programsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TrainingProgram));
      setPrograms(programsData);
    };
    fetchPrograms();
  }, []);

  return (
    <FlatList
      data={programs}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('ProgramDetail', { programId: item.id })}
        >
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});