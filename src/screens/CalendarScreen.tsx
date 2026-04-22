import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { EVENTS } from '../data/mockData';
import CalendarGrid from '../components/CalendarGrid';
import { StackScreenProps } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../navigation/AppNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Calendar'>,
  StackScreenProps<RootStackParamList>
>;

const CalendarScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(13);
  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Month');
  
  const currentMonth = 8; // September (0-indexed)
  const currentYear = 2024;
  
  const selectedEvents = EVENTS.filter(e => e.date === '2024-09-13');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.headerTitle}>Timeline</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* View Picker */}
        <View style={styles.viewPicker}>
          {['Day', 'Week', 'Month'].map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.viewPickerButton,
                viewMode === mode && styles.viewPickerButtonActive,
              ]}
              onPress={() => setViewMode(mode as any)}
            >
              <Text
                style={[
                  styles.viewPickerText,
                  viewMode === mode && styles.viewPickerTextActive,
                ]}
              >
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Month Navigator */}
        <View style={styles.monthNavigator}>
          <Text style={styles.monthText}>September 2024</Text>
          <View style={styles.navButtons}>
            <TouchableOpacity style={styles.navButton}>
              <Ionicons name="chevron-back" size={20} color={COLORS.gray700} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray700} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Card */}
        <View style={styles.calendarCard}>
          <CalendarGrid
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            currentMonth={currentMonth}
            currentYear={currentYear}
            events={EVENTS}
          />
        </View>

        {/* Today's Schedule Section */}
        <View style={styles.scheduleHeader}>
          <Text style={styles.scheduleTitle}>Today's Schedule</Text>
          <Text style={styles.eventCount}>{selectedEvents.length} EVENTS</Text>
        </View>

        {selectedEvents.map((event) => (
          <TouchableOpacity 
            key={event.id} 
            style={styles.eventCard}
            onPress={() => navigation.navigate('EventDetail', { event })}
          >
            <View style={styles.timeCol}>
              <Text style={styles.timeText}>{event.time}</Text>
              <Text style={styles.periodText}>{event.period}</Text>
            </View>
            <View style={[styles.separator, { backgroundColor: event.color || COLORS.primary }]} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventMeta}>
                {event.location} • {event.duration}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <Ionicons name="add" size={30} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.gray200,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.black,
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  viewPicker: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    padding: 4,
    marginBottom: 32,
  },
  viewPickerButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 16,
  },
  viewPickerButtonActive: {
    backgroundColor: COLORS.primary,
  },
  viewPickerText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray500,
  },
  viewPickerTextActive: {
    color: COLORS.white,
  },
  monthNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  navButtons: {
    flexDirection: 'row',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    ...SHADOWS.small,
  },
  calendarCard: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 16,
    marginBottom: 32,
    ...SHADOWS.small,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  eventCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A5A6F6',
    letterSpacing: 1,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  timeCol: {
    width: 60,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },
  periodText: {
    fontSize: 10,
    color: COLORS.gray400,
    fontWeight: '700',
    marginTop: 2,
  },
  separator: {
    width: 3,
    height: 36,
    borderRadius: 2,
    marginHorizontal: 16,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 13,
    color: COLORS.gray500,
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
});

export default CalendarScreen;
