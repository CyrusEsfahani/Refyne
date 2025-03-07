// src/components/CustomHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CustomHeaderProps {
  title: string;
  onAvatarPress?: () => void; // e.g. to change profile pic
  avatarUrl?: string;         // user’s avatar image URL
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onAvatarPress,
  avatarUrl,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backText}>{'<'} Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onAvatarPress} style={styles.avatarContainer}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar}>
            <Text style={styles.placeholderText}>?</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#1c1c1e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    color: '#ff0000',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  placeholderAvatar: {
    flex: 1,
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
