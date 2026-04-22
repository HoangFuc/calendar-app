import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SIZES, SHADOWS, FONTS } from '../theme/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES } from '../data/mockData';

type Props = StackScreenProps<RootStackParamList, 'CreateEvent'>;

const CreateEventScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2024-09-13');
  const [startTime, setStartTime] = useState('09:30');
  const [endTime, setEndTime] = useState('10:30');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [reminder, setReminder] = useState(true);
  const [notes, setNotes] = useState('');

  const handleCreateEvent = () => {
    // Logic to save event would go here
    console.log({
      title,
      date,
      startTime,
      endTime,
      location,
      selectedCategory,
      reminder,
      notes,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Schedule</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Title Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="What's on your mind?"
            placeholderTextColor={COLORS.gray400}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Category Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && {
                    backgroundColor: category.color,
                    borderColor: category.color,
                  },
                ]}
              >
                <View
                  style={[
                    styles.categoryDot,
                    { backgroundColor: category.color },
                    selectedCategory === category.id && { backgroundColor: COLORS.white },
                  ]}
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && { color: COLORS.white, fontWeight: '600' },
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Date and Time Row */}
        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.pickerButton}>
              <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
              <Text style={styles.pickerText}>{date}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity style={styles.pickerButton}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <Text style={styles.pickerText}>{startTime}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Add Location"
              placeholderTextColor={COLORS.gray400}
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Reminder Toggle */}
        <View style={styles.reminderContainer}>
          <View style={styles.reminderTextContainer}>
            <Text style={styles.reminderLabel}>Reminder</Text>
            <Text style={styles.reminderSubLabel}>Remind me 15 minutes before</Text>
          </View>
          <Switch
            value={reminder}
            onValueChange={setReminder}
            trackColor={{ false: COLORS.gray200, true: COLORS.primaryLight }}
            thumbColor={reminder ? COLORS.primary : COLORS.gray400}
          />
        </View>

        {/* Notes Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add detailed notes here..."
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={notes}
            onChangeText={setNotes}
          />
        </View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.createButton, !title && { backgroundColor: COLORS.gray300 }]}
          onPress={handleCreateEvent}
          disabled={!title}
        >
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingHorizontal: SIZES.padding,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.black,
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: 100,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.gray600,
    marginBottom: 10,
  },
  titleInput: {
    fontSize: SIZES.xxl,
    fontWeight: '700',
    color: COLORS.black,
    paddingVertical: 10,
  },
  categoryList: {
    flexDirection: 'row',
    marginHorizontal: -SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryText: {
    fontSize: SIZES.md,
    color: COLORS.gray700,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.gray100,
  },
  pickerText: {
    marginLeft: 10,
    fontSize: SIZES.base,
    color: COLORS.black,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.gray100,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: SIZES.base,
    color: COLORS.black,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.gray100,
  },
  reminderTextContainer: {
    flex: 1,
  },
  reminderLabel: {
    fontSize: SIZES.base,
    fontWeight: '600',
    color: COLORS.black,
  },
  reminderSubLabel: {
    fontSize: SIZES.sm,
    color: COLORS.gray500,
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusLg,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: SIZES.lg,
    fontWeight: '700',
  },
});

export default CreateEventScreen;

