import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useApp } from '../services/AppContext';
import { EntryItem } from './EntryItem';
import { Button } from './Button';
import { colors, borders, shadows, commonStyles } from '../styles/theme';
import { getFullDateString, isToday, formatDateToString } from '../utils/dateUtils';
import { formatTimeDisplay, calculateRemainingTime } from '../utils/timerUtils';

export function DayView() {
  const {
    currentDate,
    setCurrentDate,
    entries,
    activeEntry,
    timeLeft,
    setShowForm,
    setShowTimer,
    setView,
    isSoundPlaying,
    stopSounds,
  } = useApp();

  const isTodayView = isToday(currentDate);
  const canAddPomodoro = isTodayView && !activeEntry;

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleEntryPress = () => {
    setShowTimer(true);
  };

  const getTimeDisplay = (entry: typeof entries[0]) => {
    if (activeEntry && entry.id === activeEntry.id) {
      return formatTimeDisplay(timeLeft);
    }
    return formatTimeDisplay(calculateRemainingTime(entry));
  };

  return (
    <View style={styles.container}>
      {/* View Toggle */}
      <View style={styles.viewToggle}>
        <Pressable style={[styles.toggleBtn, styles.toggleBtnActive]}>
          <Text style={[styles.toggleText, styles.toggleTextActive]}>Day</Text>
        </Pressable>
        <Pressable
          style={[styles.toggleBtn, styles.toggleBtnRight]}
          onPress={() => setView('month')}
        >
          <Text style={styles.toggleText}>Month</Text>
        </Pressable>
      </View>

      {/* Date Navigation */}
      <View style={styles.dateNav}>
        <Pressable style={styles.navBtn} onPress={handlePreviousDay}>
          <Text style={styles.navBtnText}>{'<'}</Text>
        </Pressable>
        <Text style={styles.dateHeader}>{getFullDateString(currentDate)}</Text>
        <Pressable style={styles.navBtn} onPress={handleNextDay}>
          <Text style={styles.navBtnText}>{'>'}</Text>
        </Pressable>
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

      {/* Past/Future Day Notice */}
      {!isTodayView && (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            {currentDate < new Date() ? 'Viewing past date' : 'Viewing future date'}
          </Text>
        </View>
      )}

      {/* New Pomodoro Button */}
      {canAddPomodoro && (
        <Button
          title="+ New Pomodoro"
          onPress={() => setShowForm(true)}
          variant="green"
          fullWidth
          style={styles.newPomodoroBtn}
        />
      )}

      {/* Entries List */}
      <ScrollView style={styles.entriesList} showsVerticalScrollIndicator={false}>
        {entries.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No pomodoros yet today</Text>
          </View>
        ) : (
          entries.map((entry) => (
            <EntryItem
              key={entry.id}
              entry={entry}
              timeDisplay={getTimeDisplay(entry)}
              onPress={handleEntryPress}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleBtn: {
    backgroundColor: '#e0e7ff',
    borderWidth: borders.medium,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  toggleBtnRight: {
    borderLeftWidth: 0,
  },
  toggleBtnActive: {
    backgroundColor: '#818cf8',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  toggleTextActive: {
    color: colors.white,
  },
  dateNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navBtn: {
    backgroundColor: '#e0e7ff',
    borderWidth: borders.medium,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    ...shadows.small,
  },
  navBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  dateHeader: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  notice: {
    backgroundColor: '#f3f4f6',
    borderWidth: 2,
    borderColor: '#999',
    borderStyle: 'dashed',
    padding: 15,
    marginBottom: 20,
  },
  noticeText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  newPomodoroBtn: {
    marginBottom: 20,
  },
  stopChimingBtn: {
    marginBottom: 20,
  },
  entriesList: {
    flex: 1,
  },
  empty: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
});
