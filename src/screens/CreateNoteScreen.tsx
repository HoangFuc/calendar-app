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
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';

type Props = StackScreenProps<RootStackParamList, 'CreateNote'>;

const CreateNoteScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Personal');

  const categories = [
    { name: 'Work', color: '#4A3AFF' },
    { name: 'Personal', color: '#9B59B6' },
    { name: 'Health', color: '#2ECB71' },
    { name: 'Social', color: '#FF8C42' },
  ];

  const handleSave = () => {
    // Logic to save note
    navigation.goBack();
  };

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
        <Text style={styles.headerTitle}>New Note</Text>
        <TouchableOpacity
          style={[styles.saveButton, (!title || !content) && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!title || !content}
        >
          <Text style={styles.saveButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Category Picker */}
        <View style={styles.categoryRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.name}
              onPress={() => setSelectedCategory(cat.name)}
              style={[
                styles.categoryChip,
                selectedCategory === cat.name && { backgroundColor: cat.color, borderColor: cat.color },
              ]}
            >
              <View style={[styles.categoryDot, { backgroundColor: cat.color }, selectedCategory === cat.name && { backgroundColor: COLORS.white }]} />
              <Text style={[styles.categoryText, selectedCategory === cat.name && { color: COLORS.white }]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Title Input */}
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor={COLORS.gray400}
          value={title}
          onChangeText={setTitle}
          autoFocus
        />

        {/* Content Input */}
        <TextInput
          style={styles.contentInput}
          placeholder="Start typing..."
          placeholderTextColor={COLORS.gray400}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.gray200,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginRight: 8,
    marginBottom: 8,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray600,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 20,
  },
  contentInput: {
    fontSize: 18,
    color: COLORS.gray800,
    lineHeight: 28,
    flex: 1,
  },
});

export default CreateNoteScreen;

