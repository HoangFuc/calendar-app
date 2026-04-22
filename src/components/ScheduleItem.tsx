import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';

import { CalendarEvent } from '../data/mockData';

interface ScheduleItemProps {
  event: CalendarEvent;
  onPress?: (event: CalendarEvent) => void;
  showTimeline?: boolean;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ event, onPress, showTimeline = false }) => {

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress && onPress(event)} activeOpacity={0.7}>
      {showTimeline && (
        <View style={styles.timelineContainer}>
          <View style={[styles.timelineDot, { backgroundColor: event.color || COLORS.primary }]} />
          <View style={[styles.timelineLine, { backgroundColor: event.color ? `${event.color}30` : COLORS.primaryLight }]} />
        </View>
      )}
      
      <View style={styles.contentContainer}>
        {showTimeline && (
          <Text style={styles.timeText}>{event.time} {event.period}</Text>
        )}
        <View style={[styles.card, { borderLeftColor: event.color || COLORS.primary }]}>
          {!showTimeline && (
            <View style={styles.timeRow}>
              <Text style={styles.eventTime}>{event.time}</Text>
              <Text style={styles.eventPeriod}>{event.period}</Text>
            </View>
          )}
          <Text style={styles.eventTitle} numberOfLines={1}>{event.title}</Text>
          <Text style={styles.eventMeta} numberOfLines={1}>
            {event.location} • {event.duration}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface TimelineScheduleItemProps {
  event: CalendarEvent;
  onPress?: (event: CalendarEvent) => void;
}

const TimelineScheduleItem: React.FC<TimelineScheduleItemProps> = ({ event, onPress }) => {

  return (
    <TouchableOpacity style={tlStyles.container} onPress={() => onPress && onPress(event)} activeOpacity={0.7}>
      <View style={tlStyles.timeColumn}>
        <Text style={tlStyles.time}>{event.time} {event.period}</Text>
      </View>
      <View style={tlStyles.dotColumn}>
        <View style={[tlStyles.dot, { backgroundColor: event.color || COLORS.primary }]} />
        <View style={tlStyles.line} />
      </View>
      <View style={tlStyles.contentColumn}>
        <Text style={tlStyles.title} numberOfLines={1}>{event.title}</Text>
        <Text style={tlStyles.description} numberOfLines={1}>{event.description || event.notes}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timelineContainer: {
    alignItems: 'center',
    width: 20,
    marginRight: 12,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 28,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
  },
  timeText: {
    fontSize: SIZES.sm,
    color: COLORS.gray400,
    marginBottom: 6,
    fontWeight: '500',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 14,
    borderLeftWidth: 3,
    ...SHADOWS.small,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: SIZES.sm,
    color: COLORS.gray500,
    fontWeight: '600',
  },
  eventPeriod: {
    fontSize: SIZES.xs,
    color: COLORS.gray400,
    marginLeft: 2,
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: SIZES.base,
    color: COLORS.gray800,
    fontWeight: '700',
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: SIZES.sm,
    color: COLORS.gray400,
    fontWeight: '400',
  },
});

const tlStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  timeColumn: {
    width: 70,
    paddingTop: 2,
  },
  time: {
    fontSize: SIZES.sm,
    color: COLORS.gray500,
    fontWeight: '500',
  },
  dotColumn: {
    alignItems: 'center',
    width: 24,
    marginRight: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: COLORS.gray200,
    marginTop: 4,
  },
  contentColumn: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.base,
    color: COLORS.gray800,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: SIZES.sm,
    color: COLORS.gray400,
    fontWeight: '400',
    lineHeight: 18,
  },
});

export { ScheduleItem, TimelineScheduleItem };
export default ScheduleItem;
