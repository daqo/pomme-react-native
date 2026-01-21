import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entry, MonthData } from '../types';
import { formatDateToString } from '../utils/dateUtils';
import { generateId, REST_DURATION_MINUTES, isEntryOngoing, isEntryExpired } from '../utils/timerUtils';

const STORAGE_KEY = 'pomodoro_data';

let entries: Entry[] = [];
let initialized = false;

/**
 * Initialize database - load existing data from AsyncStorage
 */
export async function initDatabase(): Promise<void> {
  if (initialized) return;

  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      entries = JSON.parse(data);
    }
    initialized = true;
  } catch (error) {
    console.error('Failed to load data:', error);
    entries = [];
    initialized = true;
  }
}

/**
 * Save current entries to AsyncStorage
 */
async function saveToStorage(): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save data:', error);
  }
}

/**
 * Add a new pomodoro entry
 */
export async function addPomodoro(name: string, duration: number, date: string): Promise<Entry> {
  const entry: Entry = {
    id: generateId(),
    name: name.trim(),
    duration,
    date,
    completed: false,
    startedAt: Date.now(),
    type: 'pomodoro',
  };

  entries.push(entry);
  await saveToStorage();
  return entry;
}

/**
 * Add a new rest entry
 */
export async function addRest(date: string): Promise<Entry> {
  const entry: Entry = {
    id: generateId(),
    name: 'Rest',
    duration: REST_DURATION_MINUTES,
    date,
    completed: false,
    startedAt: Date.now(),
    type: 'rest',
  };

  entries.push(entry);
  await saveToStorage();
  return entry;
}

/**
 * Mark an entry as completed
 */
export async function completeEntry(id: string): Promise<void> {
  const entry = entries.find((e) => e.id === id);
  if (entry) {
    entry.completed = true;
    await saveToStorage();
  }
}

/**
 * Get the currently running entry (if any)
 */
export function getOngoingEntry(): Entry | null {
  for (const entry of entries) {
    if (isEntryOngoing(entry)) {
      return entry;
    }
  }
  return null;
}

/**
 * Get any expired entry that needs to be completed
 */
export function getExpiredEntry(): Entry | null {
  for (const entry of entries) {
    if (isEntryExpired(entry)) {
      return entry;
    }
  }
  return null;
}

/**
 * Get all entries for a specific date
 */
export function getEntriesForDate(dateString: string): Entry[] {
  return entries
    .filter((e) => e.date === dateString)
    .sort((a, b) => a.startedAt - b.startedAt);
}

/**
 * Get pomodoro counts by date for a specific month
 */
export function getPomodorosForMonth(year: number, month: number): MonthData {
  const monthData: MonthData = {};

  entries.forEach((entry) => {
    if (entry.type !== 'pomodoro' || !entry.completed) return;

    const [entryYear, entryMonth] = entry.date.split('-').map(Number);
    if (entryYear === year && entryMonth === month + 1) {
      monthData[entry.date] = (monthData[entry.date] || 0) + 1;
    }
  });

  return monthData;
}

/**
 * Get an entry by ID
 */
export function getEntryById(id: string): Entry | undefined {
  return entries.find((e) => e.id === id);
}

/**
 * Check if database is initialized
 */
export function isDatabaseReady(): boolean {
  return initialized;
}

/**
 * Clear all data (for testing)
 */
export async function clearAllData(): Promise<void> {
  entries = [];
  await AsyncStorage.removeItem(STORAGE_KEY);
}
