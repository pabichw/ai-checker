import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useHaptic } from '../hooks/useHaptic';
import { Text, View } from 'react-native';

import HomeIcon from '../assets/icons/icon-home.svg';
import GearIcon from '../assets/icons/icon-gear.svg';
import DatabaseIcon from '../assets/icons/icon-database.svg';
import { HomeStackNavigator } from './HomeStackNavigator';
import { HistoryStackNavigator } from './HistoryStackNavigator';
import { SettingsStackNavigator } from './SettingsStackNavigator';
import { styles } from '../config/styles';

const Tab = createBottomTabNavigator();

const AnimatedTabIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.tabIcon}>
      {children}
    </View>
  );
};

export const BottomTabNavigator = () => {
  const haptic = useHaptic();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: '#707070',
        },
      }}
      screenListeners={{
        tabPress: () => {
          haptic.impactAsync(haptic.ImpactFeedbackStyle.Soft);
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: () => (
            <AnimatedTabIcon>
              <HomeIcon height={20} width={20}/>
            </AnimatedTabIcon>
          ),
          tabBarLabel: (props) => {
            return (
              <Text style={{ color: props.focused ? '#000' : '#1f1f1fb4' }}>
                Home
              </Text>
            );
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStackNavigator}
        options={{
          tabBarIcon: () => (
            <AnimatedTabIcon>
              <DatabaseIcon height={20} width={20}/>
            </AnimatedTabIcon>
          ),
          tabBarLabel: (props) => {
            return (
              <Text style={{ color: props.focused ? '#000' : '#1f1f1fb4' }}>
                History
              </Text>
            );
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <AnimatedTabIcon>
              <GearIcon height={20} width={20}/>
            </AnimatedTabIcon>
          ),
          tabBarLabel: (props) => {
            return (
              <Text style={{ color: props.focused ? '#000' : '#1f1f1fb4' }}>
                Settings
              </Text>
            );
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
    </Tab.Navigator>
  );
};