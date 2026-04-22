import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../theme/colors';
import { CalendarEvent } from '../data/mockData';

interface TimelineWidgetProps {
  events: CalendarEvent[];
}

const TimelineWidget: React.FC<TimelineWidgetProps> = ({ events }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.blueBar} />
          <Text style={styles.headerTitle}>Timeline</Text>
        </View>
        <Text style={styles.headerRight}>UP NEXT</Text>
      </View>

      {/* Events List */}
      <View style={styles.eventsList}>
        {events.slice(0, 3).map((event, index) => (
          <View key={event.id} style={styles.eventItem}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{event.time}</Text>
              <Text style={styles.periodText}>{event.period}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.metaContainer}>
                <Ionicons 
                  name={event.category === 'work' ? 'videocam' : 'location'} 
                  size={12} 
                  color="rgba(255, 255, 255, 0.6)" 
                />
                <Text style={styles.metaText}>{event.location}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 32,
    padding: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueBar: {
    width: 4,
    height: 18,
    backgroundColor: '#4A3AFF',
    borderRadius: 2,
    marginRight: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerRight: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  eventsList: {
    gap: 20,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    width: 60,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  periodText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
  },
});

export default TimelineWidget;
