import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useApp } from '../services/AppContext';
import { Button } from './Button';
import { colors, borders, shadows, typography } from '../styles/theme';
import { formatTimeDisplay } from '../utils/timerUtils';

export function TimerView() {
  const { activeEntry, timeLeft, markComplete, setShowTimer, isSoundPlaying, stopSounds } = useApp();

  if (!activeEntry) {
    return null;
  }

  const isPomodoro = activeEntry.type === 'pomodoro';
  const statusLabel = isPomodoro ? 'Work Time' : 'Rest Time';

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backBtn} onPress={() => setShowTimer(false)}>
        <Text style={styles.backBtnText}>{'< Back'}</Text>
      </Pressable>

      {/* Status Badge */}
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{statusLabel}</Text>
      </View>

      {/* Task Name */}
      <Text style={styles.taskName}>{activeEntry.name}</Text>

      {/* Timer Display */}
      <View style={styles.timerDisplay}>
        <Text style={styles.timerText}>{formatTimeDisplay(timeLeft)}</Text>
      </View>

      {/* Stop Chiming Button */}
      {isSoundPlaying && (
        <Button
          title="Stop Chiming"
          onPress={stopSounds}
          variant="yellow"
          fullWidth
          style={styles.stopChimingBtn}
        />
      )}

      {/* Mark Complete Button */}
      <Button
        title="Mark Complete"
        onPress={markComplete}
        variant="green"
        fullWidth
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  backBtn: {
    marginBottom: 15,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statusBadge: {
    alignSelf: 'center',
    backgroundColor: '#a78bfa',
    borderWidth: borders.medium,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: colors.textPrimary,
  },
  taskName: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: colors.textPrimary,
  },
  timerDisplay: {
    backgroundColor: colors.timerBg,
    borderWidth: borders.thick,
    borderColor: colors.border,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 56,
    fontWeight: '900',
    fontFamily: typography.monoFamily,
    letterSpacing: 2,
    color: colors.textPrimary,
  },
  stopChimingBtn: {
    marginBottom: 10,
  },
});
