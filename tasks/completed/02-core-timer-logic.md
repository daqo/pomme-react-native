# Task: Core Timer Logic

## Description
Implement the core timer functionality that handles countdown, auto-start of rest periods, and background timing.

## Requirements
- Timer counts down from the entry's duration
- Time remaining is calculated from: (startedAt + duration*60*1000) - Date.now()
- When pomodoro completes → automatically start 5-minute rest
- When rest completes → timer stops, ready for new pomodoro
- Timer should continue running even when app is in background

## Constants
- DEFAULT_DURATION = 25 minutes
- MIN_DURATION = 0.01 minutes
- MAX_DURATION = 60 minutes
- REST_DURATION_MINUTES = 5 minutes
- TIMER_INTERVAL_MS = 1000ms

## Functions to Implement
- `calculateRemainingTime(entry)` - Calculate seconds remaining for an entry
- `formatTimeDisplay(totalSeconds)` - Convert seconds to MM:SS format
- `startTimer(entry)` - Begin countdown for an entry
- `handleTimerComplete(entry)` - Handle completion (trigger rest or finish)
- `pauseTimer()` - Not required (web app doesn't have pause)

## Timer Flow
1. User starts pomodoro → entry created with startedAt
2. setInterval updates UI every second
3. When time reaches 0:
   - Mark current entry as completed
   - Play completion sound
   - Show notification
   - If was pomodoro → create and start rest entry
   - If was rest → return to idle state

## Technical Notes
- Use react-native-background-timer for background execution
- Recalculate remaining time on app foreground (AppState listener)
- Time is always derived from timestamps, not decremented state

## Acceptance Criteria
- [ ] Timer counts down accurately
- [ ] Timer continues in background
- [ ] Rest auto-starts after pomodoro completion
- [ ] Timer state survives app restart (resumes if time remaining)
- [ ] MM:SS format displays correctly
