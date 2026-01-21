import { StyleSheet } from 'react-native';

// Color palette matching the web app
export const colors = {
  background: '#fef3c7',
  container: '#ffffff',
  border: '#000000',
  shadow: '#000000',

  completedWork: '#bbf7d0',
  ongoingWork: '#fde68a',
  ongoingWorkBorder: '#f59e0b',

  completedRest: '#e5e7eb',
  ongoingRest: '#bfdbfe',
  ongoingRestBorder: '#3b82f6',

  timerBg: '#fde68a',

  buttonGreen: '#bbf7d0',
  buttonYellow: '#fde68a',
  buttonRed: '#fecaca',

  textPrimary: '#000000',
  textMuted: '#9ca3af',
  futureDay: '#f3f4f6',

  liveBadge: '#ef4444',
  white: '#ffffff',
};

// Shadow styles for neobrutalist effect
export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
};

// Typography
export const typography = {
  fontFamily: 'System',
  monoFamily: 'Courier',
};

// Border widths
export const borders = {
  thin: 2,
  medium: 3,
  thick: 4,
};

// Common styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.container,
    borderWidth: borders.thick,
    borderColor: colors.border,
    ...shadows.medium,
  },
  button: {
    borderWidth: borders.medium,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 20,
    ...shadows.small,
  },
  buttonPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 1, height: 1 },
  },
  input: {
    borderWidth: borders.medium,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  textBold: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  textBlack: {
    fontWeight: '900',
    color: colors.textPrimary,
  },
  textMuted: {
    color: colors.textMuted,
  },
});

// Get entry background color based on state
export function getEntryBackgroundColor(
  type: 'pomodoro' | 'rest',
  completed: boolean,
  isOngoing: boolean
): string {
  if (type === 'pomodoro') {
    if (isOngoing) return colors.ongoingWork;
    if (completed) return colors.completedWork;
    return colors.container;
  } else {
    if (isOngoing) return colors.ongoingRest;
    if (completed) return colors.completedRest;
    return colors.container;
  }
}

// Get entry border color based on state
export function getEntryBorderColor(
  type: 'pomodoro' | 'rest',
  isOngoing: boolean
): string {
  if (isOngoing) {
    return type === 'pomodoro' ? colors.ongoingWorkBorder : colors.ongoingRestBorder;
  }
  return colors.border;
}
