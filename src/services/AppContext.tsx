import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Entry, MonthData, ViewMode } from '../types';
import {
  initDatabase,
  isDatabaseReady,
  getOngoingEntry,
  getExpiredEntry,
  getEntriesForDate,
  getPomodorosForMonth,
  addPomodoro,
  addRest,
  completeEntry,
} from './database';
import { formatDateToString } from '../utils/dateUtils';
import { calculateRemainingTime, TIMER_INTERVAL_MS } from '../utils/timerUtils';
import { initAudio, loadSounds, playWorkComplete, playRestComplete, stopAllSounds } from './sounds';
import { scheduleTimerNotification, cancelScheduledNotification } from './notifications';
import { REST_DURATION_MINUTES } from '../utils/timerUtils';

interface AppContextType {
  // Database state
  dbReady: boolean;

  // View state
  view: ViewMode;
  setView: (view: ViewMode) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;

  // Data
  entries: Entry[];
  monthData: MonthData;

  // Timer state
  activeEntry: Entry | null;
  timeLeft: number;
  isRunning: boolean;
  showTimer: boolean;
  setShowTimer: (show: boolean) => void;

  // Form state
  showForm: boolean;
  setShowForm: (show: boolean) => void;

  // Sound state
  isSoundPlaying: boolean;

  // Actions
  startPomodoro: (name: string, duration: number) => Promise<void>;
  markComplete: () => Promise<void>;
  refreshData: () => void;
  stopSounds: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Database state
  const [dbReady, setDbReady] = useState(false);

  // View state
  const [view, setView] = useState<ViewMode>('day');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Data
  const [entries, setEntries] = useState<Entry[]>([]);
  const [monthData, setMonthData] = useState<MonthData>({});

  // Timer state
  const [activeEntry, setActiveEntry] = useState<Entry | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  // Form state
  const [showForm, setShowForm] = useState(false);

  // Sound state
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  // Refs for timer
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize database and audio
  useEffect(() => {
    async function init() {
      await initDatabase();
      await initAudio();
      await loadSounds();
      setDbReady(true);
    }
    init();
  }, []);

  // Refresh data from database
  const refreshData = useCallback(() => {
    if (!isDatabaseReady()) return;

    const dateStr = formatDateToString(currentDate);
    setEntries(getEntriesForDate(dateStr));
    setMonthData(getPomodorosForMonth(currentDate.getFullYear(), currentDate.getMonth()));

    // Check for ongoing or expired entry
    const expired = getExpiredEntry();
    if (expired) {
      handleTimerComplete(expired);
    } else {
      const ongoing = getOngoingEntry();
      if (ongoing) {
        setActiveEntry(ongoing);
        setTimeLeft(calculateRemainingTime(ongoing));
        setIsRunning(true);
      } else {
        setActiveEntry(null);
        setTimeLeft(0);
        setIsRunning(false);
      }
    }
  }, [currentDate]);

  // Refresh data when database is ready or date changes
  useEffect(() => {
    if (dbReady) {
      refreshData();
    }
  }, [dbReady, currentDate, refreshData]);

  // Handle timer completion
  const handleTimerComplete = useCallback(async (entry: Entry) => {
    await completeEntry(entry.id);

    if (entry.type === 'pomodoro') {
      // Play work completion sound (loops until user interaction)
      playWorkComplete(true);
      setIsSoundPlaying(true);
      // Auto-start rest period
      const dateStr = formatDateToString(new Date());
      const restEntry = await addRest(dateStr);
      setActiveEntry(restEntry);
      setTimeLeft(calculateRemainingTime(restEntry));
      setIsRunning(true);
      // Schedule notification for rest completion
      scheduleTimerNotification('rest', '', REST_DURATION_MINUTES * 60);
    } else {
      // Play rest completion sound (loops until user interaction)
      playRestComplete(true);
      setIsSoundPlaying(true);
      // Rest completed, return to idle
      setActiveEntry(null);
      setTimeLeft(0);
      setIsRunning(false);
      setShowTimer(false);
    }

    // Refresh entries list
    const dateStr = formatDateToString(currentDate);
    setEntries(getEntriesForDate(dateStr));
    setMonthData(getPomodorosForMonth(currentDate.getFullYear(), currentDate.getMonth()));
  }, [currentDate]);

  // Timer tick
  useEffect(() => {
    if (isRunning && activeEntry) {
      timerRef.current = setInterval(() => {
        const remaining = calculateRemainingTime(activeEntry);
        setTimeLeft(remaining);

        if (remaining <= 0) {
          handleTimerComplete(activeEntry);
        }
      }, TIMER_INTERVAL_MS);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [isRunning, activeEntry, handleTimerComplete]);

  // Handle app state changes (foreground/background)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        // Check for expired entry and play sound if needed
        // refreshData will handle playing the completion sound via handleTimerComplete
        refreshData();
      }
    });

    return () => subscription.remove();
  }, [refreshData]);

  // Listen for notifications received while app is foregrounded
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      const data = notification.request.content.data;
      if (data?.type === 'pomodoro') {
        playWorkComplete(true);
        setIsSoundPlaying(true);
      } else if (data?.type === 'rest') {
        playRestComplete(true);
        setIsSoundPlaying(true);
      }
    });

    return () => notificationListener.remove();
  }, []);

  // Start a new pomodoro
  const startPomodoro = useCallback(async (name: string, duration: number) => {
    stopAllSounds(); // Stop any playing sounds
    setIsSoundPlaying(false);
    const dateStr = formatDateToString(new Date());
    const entry = await addPomodoro(name, duration, dateStr);
    setActiveEntry(entry);
    setTimeLeft(calculateRemainingTime(entry));
    setIsRunning(true);
    setShowForm(false);
    setShowTimer(true);
    // Schedule notification for when pomodoro completes
    scheduleTimerNotification('pomodoro', name, duration * 60);
    refreshData();
  }, [refreshData]);

  // Manually mark current timer as complete
  const markComplete = useCallback(async () => {
    stopAllSounds(); // Stop any playing sounds
    setIsSoundPlaying(false);
    cancelScheduledNotification(); // Cancel scheduled notification
    if (activeEntry) {
      await handleTimerComplete(activeEntry);
    }
  }, [activeEntry, handleTimerComplete]);

  // Stop all sounds (exposed to components)
  const stopSounds = useCallback(() => {
    stopAllSounds();
    setIsSoundPlaying(false);
  }, []);

  const value: AppContextType = {
    dbReady,
    view,
    setView,
    currentDate,
    setCurrentDate,
    entries,
    monthData,
    activeEntry,
    timeLeft,
    isRunning,
    showTimer,
    setShowTimer,
    showForm,
    setShowForm,
    isSoundPlaying,
    startPomodoro,
    markComplete,
    refreshData,
    stopSounds,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
