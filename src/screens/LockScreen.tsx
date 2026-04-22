import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { EVENTS } from '../data/mockData';
import TimelineWidget from '../components/TimelineWidget';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'LockScreen'>;

const LockScreen: React.FC<Props> = ({ navigation }) => {
  const todayEvents = EVENTS.filter(e => e.date === '2024-09-13');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' }} // Dark wavy abstract
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Top Info */}
          <View style={styles.topInfo}>
            <Ionicons name="lock-closed" size={20} color="#FFFFFF" style={styles.lockIcon} />
            <Text style={styles.dateText}>Monday, Oct 24</Text>
            <Text style={styles.timeText}>09:41</Text>
          </View>

          {/* Widgets Area */}
          <View style={styles.widgetsArea}>
            <TimelineWidget events={todayEvents} />

            {/* Focus Mode Widget */}
            <View style={styles.focusWidget}>
              <View style={styles.focusIconContainer}>
                <Ionicons name="flash" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.focusTextContainer}>
                <Text style={styles.focusLabel}>FOCUS MODE</Text>
                <Text style={styles.focusValue}>Deep Work: 45m left</Text>
              </View>
            </View>
          </View>

          {/* Bottom Icons */}
          <View style={styles.bottomRow}>
            <TouchableOpacity style={styles.bottomButton}>
              <Ionicons name="flashlight" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.homeIndicator} />

            <TouchableOpacity style={styles.bottomButton}>
              <Ionicons name="camera" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Close Simulation Button */}
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeButtonText}>Exit Preview</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  topInfo: {
    alignItems: 'center',
    marginTop: 40,
  },
  lockIcon: {
    marginBottom: 10,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 90,
    fontWeight: '700',
    letterSpacing: -2,
  },
  widgetsArea: {
    width: '90%',
    gap: 16,
  },
  focusWidget: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 50,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  focusIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(74, 58, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  focusTextContainer: {
    flex: 1,
  },
  focusLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  focusValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  bottomButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIndicator: {
    width: 140,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    position: 'absolute',
    bottom: -10,
    left: '50%',
    marginLeft: -70,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default LockScreen;

