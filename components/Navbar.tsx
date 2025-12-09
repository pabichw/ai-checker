import React from 'react';
import { styles } from '../styles/Navbar.styles';
import { BlurView } from 'expo-blur';
import { Text } from 'react-native';

export const Navbar: React.FC = () => {
  return (
    <BlurView intensity={20} tint="dark" style={styles.navbar}>
        <Text>AI Checker</Text>
    </BlurView>
  );
};
