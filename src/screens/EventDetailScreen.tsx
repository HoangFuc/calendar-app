import React from 'react';
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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'EventDetail'>;

const EventDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { event } = route.params;

  // Simple date formatter (for demo purposes)
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Detail</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search-outline" size={24} color={COLORS.gray700} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditEvent', { event })}
          >
            <MaterialCommunityIcons name="note-edit" size={20} color="#FFB800" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Category Tag */}
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{event.category?.toUpperCase() || 'GENERAL'}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{event.title}</Text>

        {/* Info Rows */}
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar-outline" size={22} color={COLORS.primary} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>{formatDate(event.date)}</Text>
            <Text style={styles.infoSubtitle}>DATE</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="time-outline" size={22} color={COLORS.primary} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>
              {event.time} {event.period} {event.duration ? `– ${event.duration}` : ''}
            </Text>
            <Text style={styles.infoSubtitle}>TIME</Text>
          </View>
        </View>

        {/* Event Image */}
        {event.image ? (
          <Image source={{ uri: event.image }} style={styles.eventImage} />
        ) : (
          <View style={[styles.eventImage, styles.imagePlaceholder]}>
            <Ionicons name="image-outline" size={48} color={COLORS.gray300} />
          </View>
        )}

        {/* Notes Section */}
        <View style={styles.notesHeader}>
          <Text style={styles.notesTitle}>Full Note Content</Text>
          <Ionicons name="document-text-outline" size={20} color={COLORS.gray500} />
        </View>

        <View style={styles.notesCard}>
          <Text style={styles.notesContent}>
            {event.notes || event.description || 'No additional notes provided for this event.'}
          </Text>
        </View>
      </ScrollView>
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
    paddingBottom: 20,
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 12,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#34495E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  categoryTag: {
    backgroundColor: '#F0F0FF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.black,
    lineHeight: 40,
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 2,
  },
  infoSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray400,
    letterSpacing: 1,
  },
  eventImage: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    marginVertical: 32,
  },
  imagePlaceholder: {
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderStyle: 'dashed',
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  notesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    ...SHADOWS.small,
  },
  notesContent: {
    fontSize: 16,
    color: COLORS.gray700,
    lineHeight: 24,
  },
});

export default EventDetailScreen;
