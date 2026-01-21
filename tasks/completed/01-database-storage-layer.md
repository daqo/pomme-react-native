# Task: Database & Storage Layer

## Description
Implement persistent storage for pomodoro entries using AsyncStorage with a structured data model.

## Requirements
- Store pomodoro entries with the following schema:
  - id: unique identifier
  - name: task name (string, 1-100 chars)
  - duration: duration in minutes (number, 0.01-60)
  - date: YYYY-MM-DD format string
  - completed: boolean (0 or 1)
  - startedAt: Unix timestamp in milliseconds
  - type: 'pomodoro' | 'rest'

## Functions to Implement
- `initDatabase()` - Initialize storage, load existing data
- `addPomodoro(name, duration, date)` - Create new pomodoro entry
- `addRest(duration, date)` - Create new rest entry
- `completePomodoro(id)` - Mark entry as completed
- `getOngoingEntry()` - Get currently running timer (if any)
- `getPomodorosForDate(dateString)` - Get all entries for a specific day
- `getPomodorosForMonth(year, month)` - Get pomodoro counts by date for month view
- `saveToStorage()` - Persist data to AsyncStorage
- `loadFromStorage()` - Load data from AsyncStorage

## Technical Notes
- Use @react-native-async-storage/async-storage
- Store as JSON string under key 'pomodoro_data'
- Ensure data survives app restarts
- Handle migration if schema changes

## Acceptance Criteria
- [ ] All CRUD operations work correctly
- [ ] Data persists across app restarts
- [ ] Ongoing entry is correctly identified by checking startedAt + duration vs current time
- [ ] Date queries return correct filtered results
