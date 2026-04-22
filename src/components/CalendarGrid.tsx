import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

import { CalendarEvent } from '../data/mockData';

interface CalendarGridProps {
  selectedDate: number;
  onSelectDate: (day: number) => void;
  currentMonth: number;
  currentYear: number;
  events?: CalendarEvent[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ selectedDate, onSelectDate, currentMonth, currentYear, events = [] }) => {
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sun=0 to Mon-based
  };


  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);

  const generateDays = () => {
    const days: { day: number; isCurrentMonth: boolean; isToday: boolean; isSelected?: boolean; hasEvent?: boolean }[] = [];

    
    // Previous month trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: false,
      });
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === today.getDate() && 
                      currentMonth === today.getMonth() && 
                      currentYear === today.getFullYear();
      
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const hasEvent = events.some(e => e.date === dateStr);

      days.push({
        day: i,
        isCurrentMonth: true,
        isToday,
        isSelected: selectedDate === i,
        hasEvent,
      });
    }
    
    // Next month leading days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isToday: false,
      });
    }
    
    return days;
  };

  const days = generateDays();

  return (
    <View style={styles.container}>
      {/* Day Headers */}
      <View style={styles.headerRow}>
        {DAYS.map((day) => (
          <View key={day} style={styles.headerCell}>
            <Text style={[
              styles.headerText,
              day === 'FRI' && styles.headerTextHighlight,
            ]}>
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.grid}>
        {days.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dayCell}
            onPress={() => item.isCurrentMonth && onSelectDate(item.day)}
            activeOpacity={0.6}
          >
            <View style={[
              styles.dayInner,
              item.isSelected ? styles.selectedDay : null,
              (item.isToday && !item.isSelected) ? styles.todayDay : null,
            ]}>
              <Text style={[
                styles.dayText,
                !item.isCurrentMonth ? styles.inactiveDay : null,
                item.isSelected ? styles.selectedDayText : null,
                (item.isToday && !item.isSelected) ? styles.todayDayText : null,
              ]}>
                {item.day}
              </Text>
            </View>
            {item.hasEvent && !item.isSelected && (
              <View style={styles.eventDot} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerText: {
    fontSize: SIZES.xs,
    color: COLORS.gray400,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  headerTextHighlight: {
    color: COLORS.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 4,
    minHeight: 42,
  },
  dayInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: SIZES.md,
    color: COLORS.gray700,
    fontWeight: '500',
  },
  inactiveDay: {
    color: COLORS.gray300,
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  selectedDayText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  todayDay: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  todayDayText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginTop: 2,
  },
});

export default CalendarGrid;
