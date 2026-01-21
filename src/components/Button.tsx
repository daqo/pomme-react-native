import React, { useRef } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, borders, shadows } from '../styles/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'green' | 'yellow' | 'red' | 'default';
  fullWidth?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'default',
  fullWidth = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const shadowX = useRef(new Animated.Value(3)).current;
  const shadowY = useRef(new Animated.Value(3)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 2,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 2,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case 'green':
        return colors.buttonGreen;
      case 'yellow':
        return colors.buttonYellow;
      case 'red':
        return colors.buttonRed;
      default:
        return '#e0e7ff';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: getBackgroundColor(),
            transform: [{ translateX }, { translateY }],
          },
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          style,
        ]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: borders.medium,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 24,
    ...shadows.small,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.textPrimary,
  },
});
