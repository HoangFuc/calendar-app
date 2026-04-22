import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

// Import Screens
import HomeScreen from 'screens/HomeScreen';
import CalendarScreen from 'screens/CalendarScreen';
import NotesScreen from 'screens/NotesScreen';
import CreateEventScreen from 'screens/CreateEventScreen';
import EventDetailScreen from 'screens/EventDetailScreen';
import EditEventScreen from 'screens/EditEventScreen';
import CreateNoteScreen from 'screens/CreateNoteScreen';
import LockScreen from 'screens/LockScreen';

import { CalendarEvent } from '../data/mockData';

export type MainTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Notes: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  CreateEvent: undefined;
  EventDetail: { event: CalendarEvent };
  EditEvent: { event: CalendarEvent };
  CreateNote: undefined;
  LockScreen: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();


const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Notes') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else {
            iconName = 'help-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray400,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: COLORS.white,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen
          name="EditEvent"
          component={EditEventScreen}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="CreateNote"
          component={CreateNoteScreen}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen name="LockScreen" component={LockScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

