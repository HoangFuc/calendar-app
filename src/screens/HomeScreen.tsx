import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Image,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { STATS } from '../data/mockData';
import { eventService } from '../services/eventService';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, MainTabParamList } from '../navigation/AppNavigator';
import { CalendarEvent } from '../data/mockData';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  StackScreenProps<RootStackParamList>
>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data || []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const todayStr = '2024-09-13';
  const todayEvents = events.filter((e) => e.date === todayStr);
  const nextEvent = events.find(e => e.id === '2') || (events.length > 0 ? events[0] : null);

  if (loading && !refreshing) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.previewButton}
            onPress={() => navigation.navigate('LockScreen')}
          >
            <Ionicons name="phone-portrait-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search-outline" size={24} color={COLORS.gray700} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
        }
      >
        {/* Next Event Card */}
        {nextEvent && (
          <View style={styles.nextEventCard}>
            <View style={styles.nextEventHeader}>
              <Text style={styles.nextEventLabel}>NEXT EVENT</Text>
              <View style={styles.timeBadge}>
                <Text style={styles.timeBadgeText}>IN 45 MIN</Text>
              </View>
            </View>
            <Text style={styles.nextEventTitle}>{nextEvent.title}</Text>
            <Text style={styles.nextEventMeta}>
              {nextEvent.location} • {nextEvent.time} {nextEvent.period}
            </Text>
          </View>
        )}

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="checkmark-circle-outline" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.statNumber}>{STATS.pendingTasks}</Text>
            <Text style={styles.statLabel}>Pending Tasks</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialCommunityIcons name="file-document-outline" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.statNumber}>{STATS.recentNotes}</Text>
            <Text style={styles.statLabel}>Recent Notes</Text>
          </View>
        </View>

        {/* Today's Schedule Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <Text style={styles.sectionDate}>Oct 24, 2023</Text>
        </View>

        {/* Timeline List */}
        <View style={styles.timelineContainer}>
          <View style={styles.timelineLine} />
          
          {todayEvents.length > 0 ? (
            todayEvents.map((event, index) => (
              <View key={event.id} style={styles.timelineItem}>
                <View style={[styles.timelineDot, { backgroundColor: event.color || COLORS.primary }]} />
                <View style={styles.itemContent}>
                  <Text style={[styles.itemTime, { color: event.color || COLORS.primary }]}>
                    {event.time} {event.period}
                  </Text>
                  <TouchableOpacity
                    style={index % 2 === 0 ? styles.eventCardWhite : styles.eventCardBlue}
                    onPress={() => navigation.navigate('EventDetail', { event })}
                  >
                    <View style={styles.eventCardRow}>
                      <View style={styles.eventCardTextCol}>
                        <Text style={styles.eventCardTitle}>{event.title}</Text>
                        <Text style={styles.eventCardSub} numberOfLines={2}>
                          {event.description || event.notes}
                        </Text>
                      </View>
                      {event.category === 'work' && (
                        <Ionicons name="videocam-outline" size={20} color={COLORS.primary} />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No events for today</Text>
          )}
        </View>

      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateEvent')}
        activeOpacity={0.8}
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  nextEventCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    ...SHADOWS.small,
  },
  nextEventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  nextEventLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A5A6F6',
    letterSpacing: 1,
  },
  timeBadge: {
    backgroundColor: '#F0F0FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
  },
  nextEventTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 8,
  },
  nextEventMeta: {
    fontSize: 14,
    color: COLORS.gray500,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F8F9FE',
    borderRadius: 24,
    padding: 20,
  },
  statIconContainer: {
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray500,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  sectionDate: {
    fontSize: 14,
    color: COLORS.gray500,
  },
  timelineContainer: {
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 11,
    top: 8,
    bottom: 0,
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    marginTop: 6,
    zIndex: 1,
  },
  timelineDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    marginTop: 6,
    zIndex: 1,
  },
  itemContent: {
    flex: 1,
    marginLeft: 24,
  },
  itemTime: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 12,
  },
  itemTimeActive: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 12,
  },
  eventCardWhite: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    ...SHADOWS.small,
  },
  eventCardBlue: {
    backgroundColor: '#F0F2FF',
    borderRadius: 20,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  eventCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventCardTextCol: {
    flex: 1,
    marginRight: 12,
  },
  eventCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 4,
  },
  eventCardSub: {
    fontSize: 13,
    color: COLORS.gray600,
    lineHeight: 18,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray400,
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
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

export default HomeScreen;
