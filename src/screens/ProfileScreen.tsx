import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { app } from '../services/firebase';
import type { RootState } from '../redux/store';
import ProfileCalendar from './ProfileCalendar';

// Interface definitions remain the same...

const db = getFirestore(app);

const ProfileScreen = () => {
  const { uid } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // This will run every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (uid) {
        fetchUserProfile(uid);
        fetchUserWorkouts(uid);
      }
    }, [uid])
  );

  const fetchUserProfile = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const snapshot = await getDoc(userDocRef);
      if (snapshot.exists()) {
        setProfileData(snapshot.data());
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserWorkouts = async (userId) => {
    try {
      setLoading(true);
      const workoutsRef = collection(db, 'users', userId, 'workouts');
      const snapshot = await getDocs(workoutsRef);
      const userWorkouts = [];
      snapshot.forEach((docSnap) => {
        userWorkouts.push({ id: docSnap.id, ...docSnap.data() });
      });
      
      // Sort workouts by date (newest first)
      userWorkouts.sort((a, b) => {
        return new Date(b.workoutDate) - new Date(a.workoutDate);
      });
      
      setWorkouts(userWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (uid) {
      fetchUserProfile(uid);
      fetchUserWorkouts(uid);
    } else {
      setRefreshing(false);
    }
  }, [uid]);

  const formatDate = (isoDate) =>
    isoDate ? new Date(isoDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A';

  if (!uid) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.infoText}>Please log in to see your profile.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ff0000" />
        }
      >
        <Text style={styles.header}>My Profile</Text>

        {/* User Profile Summary Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatarPlaceholder}>
            <Text style={styles.profileAvatarText}>
              {profileData.firstName ? profileData.firstName.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
          <Text style={styles.profileName}>{profileData.firstName || 'Fitness'} {profileData.lastName || 'User'}</Text>
          {profileData.fitnessGoal && <Text style={styles.profileTagline}>Goal: {profileData.fitnessGoal}</Text>}
        </View>

        {/* Physical Stats Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Physical Stats</Text>
          <Text style={styles.cardText}>Body Fat: {profileData.bodyFat || 'N/A'}</Text>
          {profileData.measurements && (
            <Text style={styles.cardText}>
              Measurements: Chest {profileData.measurements.chest || 'N/A'}, Arms {profileData.measurements.arms || 'N/A'}, Waist {profileData.measurements.waist || 'N/A'}
            </Text>
          )}
        </View>

        {/* Goals Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Goals</Text>
          <Text style={styles.cardText}>Fitness Goal: {profileData.fitnessGoal || 'N/A'}</Text>
          <Text style={styles.cardText}>Start Date: {formatDate(profileData.startDate)}</Text>
        </View>

        {/* Preferences Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Preferences</Text>
          <Text style={styles.cardText}>Diet Type: {profileData.dietType || 'N/A'}</Text>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('ProfileSetupScreen')}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Workouts Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.header}>My Workouts</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('ProgramDesignScreen')}
          >
            <Text style={styles.addButtonText}>Add New</Text>
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color="#ff0000" style={styles.loader} />
        ) : workouts.length === 0 ? (
          <View style={styles.emptyWorkoutContainer}>
            <Text style={styles.infoText}>No workouts saved yet.</Text>
            <TouchableOpacity 
              style={styles.createWorkoutButton}
              onPress={() => navigation.navigate('ProgramDesignScreen')}
            >
              <Text style={styles.createWorkoutButtonText}>Create Workout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          workouts.map((item) => (
            <View key={item.id} style={styles.workoutCard}>
              <View style={styles.workoutHeader}>
                <Text style={styles.workoutTitle}>{item.name}</Text>
                <View style={styles.workoutBadge}>
                  <Text style={styles.workoutBadgeText}>{item.muscleGroup}</Text>
                </View>
              </View>
              <Text style={styles.workoutSubtitle}>Date: {formatDate(item.workoutDate)}</Text>
              <View style={styles.exercisesList}>
                {item.exercises.map((ex) => (
                  <Text key={ex.id} style={styles.workoutExercise}>
                    • {ex.name} ({ex.equipment || 'N/A'})
                  </Text>
                ))}
              </View>
            </View>
          ))
        )}

        {/* Integrated Calendar */}
        <Text style={styles.header}>Workout Calendar</Text>
        <ProfileCalendar workouts={workouts} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileCard: {
    backgroundColor: '#2c2c2e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  profileAvatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileAvatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileTagline: {
    color: '#ccc',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#2c2c2e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 6,
  },
  editButton: {
    backgroundColor: '#ff0000',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  workoutCard: {
    backgroundColor: '#2c2c2e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#ff0000',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  workoutTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  workoutBadge: {
    backgroundColor: '#444',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  workoutBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  workoutSubtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  exercisesList: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#3c3c3e',
    paddingTop: 8,
  },
  workoutExercise: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 4,
  },
  emptyWorkoutContainer: {
    backgroundColor: '#2c2c2e',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  createWorkoutButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  createWorkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  infoText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
});

export default ProfileScreen;