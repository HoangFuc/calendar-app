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
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { CATEGORIES } from '../data/mockData';

type Props = StackScreenProps<RootStackParamList, 'EditEvent'>;

const EditEventScreen: React.FC<Props> = ({ route, navigation }) => {
  const { event } = route.params;

  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(`${event.time} ${event.period}`);
  const [reminder, setReminder] = useState(event.reminder);
  const [selectedColor, setSelectedColor] = useState(event.color || COLORS.primary);
  const [notes, setNotes] = useState(event.notes || event.description || '');

  const handleSave = () => {
    // Logic to update event
    navigation.goBack();
  };

  const colors = [
    '#4A3AFF', // Blue
    '#FF8C42', // Orange
    '#2ECB71', // Green
    '#FF6B8A', // Pink
    '#42C6FF', // Cyan
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Event</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Title Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>EVENT TITLE</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter title"
            />
          </View>
        </View>

        {/* Date and Time Row */}
        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>DATE</Text>
            <View style={styles.pickerWrapper}>
              <TextInput style={styles.pickerInput} value={date} editable={false} />
              <Ionicons name="calendar-outline" size={20} color={COLORS.black} />
            </View>
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>TIME</Text>
            <View style={styles.pickerWrapper}>
              <TextInput style={styles.pickerInput} value={time} editable={false} />
              <Ionicons name="time-outline" size={20} color={COLORS.black} />
            </View>
          </View>
        </View>

        {/* Reminder Card */}
        <View style={styles.reminderCard}>
          <View style={styles.reminderIcon}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
          </View>
          <View style={styles.reminderTextContainer}>
            <Text style={styles.reminderTitle}>Reminder</Text>
            <Text style={styles.reminderSubtitle}>15 minutes before</Text>
          </View>
          <Switch
            value={reminder}
            onValueChange={setReminder}
            trackColor={{ false: '#E0E0E0', true: COLORS.primaryLight }}
            thumbColor={reminder ? COLORS.primary : '#BDBDBD'}
          />
        </View>

        {/* Category Color */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>CATEGORY COLOR</Text>
          <View style={styles.colorRow}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorCircleActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Notes Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>NOTES</Text>
          <View style={[styles.inputWrapper, styles.notesWrapper]}>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              placeholder="Add your notes here..."
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.discardButton} onPress={() => navigation.goBack()}>
          <Text style={styles.discardButtonText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton} onPress={handleSave}>
          <Text style={styles.updateButtonText}>Update Schedule</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: COLORS.white,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray500,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  pickerInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
    padding: 16,
    borderRadius: 24,
    marginBottom: 32,
  },
  reminderIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8E5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  reminderTextContainer: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },
  reminderSubtitle: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 2,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  colorCircleActive: {
    borderWidth: 3,
    borderColor: '#D0D0FF',
  },
  notesWrapper: {
    minHeight: 180,
    paddingTop: 16,
  },
  notesInput: {
    fontSize: 16,
    color: COLORS.gray700,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  discardButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 18,
    borderRadius: 24,
    marginRight: 12,
    alignItems: 'center',
  },
  discardButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },
  updateButton: {
    flex: 2,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default EditEventScreen;

