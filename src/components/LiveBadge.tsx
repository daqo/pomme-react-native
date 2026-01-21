import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/theme';

export function LiveBadge() {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [scale]);

  return (
    <Animated.View style={[styles.badge, { transform: [{ scale }] }]}>
      <Text style={styles.text}>LIVE</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.liveBadge,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  text: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
