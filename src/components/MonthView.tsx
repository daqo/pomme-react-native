import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useApp } from '../services/AppContext';
import { colors, borders, shadows } from '../styles/theme';
import {
  getMonthCalendarInfo,
  getMonthYearString,
  isToday,
  isFutureDate,
  formatDateToString,
} from '../utils/dateUtils';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const CELL_HEIGHT = 52;

export function MonthView() {
  const { currentDate, setCurrentDate, monthData, setView } = useApp();

  const { firstDayOfWeek, totalDays } = getMonthCalendarInfo(currentDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePreviousMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentDate(newDate);
  };

  const handleDayPress = (day: number) => {
    const selectedDate = new Date(year, month, day);
    setCurrentDate(selectedDate);
    setView('day');
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<View key={`empty-start-${i}`} style={styles.emptyDay} />);
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const dateString = formatDateToString(date);
      const isCurrentDay = isToday(date);
      const isFuture = isFutureDate(date);
      const pomodoroCount = monthData[dateString] || 0;

      days.push(
        <Pressable
          key={day}
          style={[
            styles.day,
            isCurrentDay && styles.dayToday,
            isFuture && styles.dayFuture,
          ]}
          onPress={() => handleDayPress(day)}
        >
          <Text
            style={[
              styles.dayNumber,
              isCurrentDay && styles.dayNumberToday,
              isFuture && styles.dayNumberFuture,
            ]}
          >
            {day}
          </Text>
          {pomodoroCount > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{pomodoroCount}</Text>
            </View>
          )}
        </Pressable>
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      {/* View Toggle */}
      <View style={styles.viewToggle}>
        <Pressable
          style={[styles.toggleBtn]}
          onPress={() => {
            setCurrentDate(new Date());
            setView('day');
          }}
        >
          <Text style={styles.toggleText}>Day</Text>
        </Pressable>
        <Pressable style={[styles.toggleBtn, styles.toggleBtnRight, styles.toggleBtnActive]}>
          <Text style={[styles.toggleText, styles.toggleTextActive]}>Month</Text>
        </Pressable>
      </View>

      {/* Month Navigation */}
      <View style={styles.monthNav}>
        <Pressable style={styles.navBtn} onPress={handlePreviousMonth}>
          <Text style={styles.navBtnText}>{'<'}</Text>
        </Pressable>
        <Text style={styles.monthHeader}>{getMonthYearString(currentDate)}</Text>
        <Pressable style={styles.navBtn} onPress={handleNextMonth}>
          <Text style={styles.navBtnText}>{'>'}</Text>
        </Pressable>
      </View>

      {/* Calendar */}
      <View style={styles.calendar}>
        {/* Weekday Headers */}
        <View style={styles.weekdayHeader}>
          {WEEKDAYS.map((day, index) => (
            <View key={index} style={styles.weekdayCell}>
              <Text style={styles.weekdayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>{renderCalendarDays()}</View>
      </View>
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
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  toggleBtnRight: {
    borderLeftWidth: 0,
  },
  toggleBtnActive: {
    backgroundColor: '#818cf8',
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  toggleTextActive: {
    color: colors.white,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  navBtn: {
    backgroundColor: '#e0e7ff',
    borderWidth: borders.medium,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
    ...shadows.small,
  },
  navBtnText: {
    fontSize: 18,
    fontWeight: '700',
  },
  monthHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  calendar: {
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  weekdayHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    backgroundColor: '#f3f4f6',
  },
  weekdayCell: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6b7280',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14.285714%',
    height: CELL_HEIGHT,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayToday: {
    backgroundColor: '#fef3c7',
  },
  dayFuture: {
    backgroundColor: '#f9fafb',
  },
  emptyDay: {
    width: '14.285714%',
    height: CELL_HEIGHT,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fafafa',
  },
  dayNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dayNumberToday: {
    fontWeight: '800',
    color: '#d97706',
  },
  dayNumberFuture: {
    color: '#9ca3af',
  },
  countBadge: {
    position: 'absolute',
    bottom: 4,
    backgroundColor: '#818cf8',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    minWidth: 20,
    alignItems: 'center',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
  },
});
