import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../theme/colors';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {

  const tabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { name: 'Calendar', icon: 'calendar-outline', activeIcon: 'calendar' },
    { name: 'Notes', icon: 'document-text-outline', activeIcon: 'document-text' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isFocused = state.index === index;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name)}
          >
            <Text style={{ color: isFocused ? COLORS.primary : COLORS.gray400 }}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    padding: 6,
    borderRadius: 12,
  },
  activeIconContainer: {
    backgroundColor: COLORS.primaryLight,
  },
  label: {
    fontSize: SIZES.xs,
    color: COLORS.gray400,
    marginTop: 2,
    fontWeight: '500',
  },
  activeLabel: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default BottomTabBar;
