import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Entry } from '../types';
import { LiveBadge } from './LiveBadge';
import { colors, borders } from '../styles/theme';
import { isEntryOngoing } from '../utils/timerUtils';

interface EntryItemProps {
  entry: Entry;
  timeDisplay: string;
  onPress?: () => void;
}

export function EntryItem({ entry, timeDisplay, onPress }: EntryItemProps) {
  const ongoing = isEntryOngoing(entry);
  const isPomodoro = entry.type === 'pomodoro';

  // Animated glow effect for ongoing entries
  const glowOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (ongoing) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacity, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [ongoing, glowOpacity]);

  const getBackgroundColor = () => {
    if (isPomodoro) {
      return ongoing ? colors.ongoingWork : colors.completedWork;
    } else {
      return ongoing ? colors.ongoingRest : colors.completedRest;
    }
  };

  const getBorderColor = () => {
    if (ongoing) {
      return isPomodoro ? colors.ongoingWorkBorder : colors.ongoingRestBorder;
    }
    return colors.border;
  };

  const getAccentColor = () => {
    if (isPomodoro) {
      return ongoing ? '#f59e0b' : '#22c55e';
    } else {
      return ongoing ? '#3b82f6' : '#6b7280';
    }
  };

  const content = (
    <View style={styles.cardWrapper}>
      {/* Glow effect for ongoing */}
      {ongoing && (
        <Animated.View
          style={[
            styles.glowEffect,
            {
              backgroundColor: getAccentColor(),
              opacity: glowOpacity,
            },
          ]}
        />
      )}

      {/* Entry card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
          },
        ]}
      >
        {/* Left accent bar */}
        <View style={[styles.accentBar, { backgroundColor: getAccentColor() }]} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={[styles.name, entry.type === 'rest' && styles.restText]} numberOfLines={1}>
            {entry.name}
          </Text>
          <View style={styles.rightSection}>
            <Text style={styles.duration}>
              {entry.completed ? `${entry.duration}m` : timeDisplay}
            </Text>
            {ongoing && <LiveBadge />}
          </View>
        </View>
      </View>
    </View>
  );

  if (ongoing && onPress) {
    return (
      <Pressable onPress={onPress} style={styles.container}>
        {content}
      </Pressable>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  cardWrapper: {
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 2,
  },
  card: {
    flexDirection: 'row',
    borderWidth: borders.medium,
    overflow: 'hidden',
  },
  accentBar: {
    width: 6,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  restText: {
    color: '#374151',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  duration: {
    fontSize: 16,
    color: '#555',
    fontWeight: '700',
  },
});
