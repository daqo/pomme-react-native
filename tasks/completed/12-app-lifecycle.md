# Task: App Lifecycle & Background Handling

## Description
Handle app lifecycle events to ensure timer accuracy and proper state management.

## Scenarios to Handle

### 1. App Goes to Background
- Timer continues running (via background timer)
- Scheduled notification will fire at completion time
- Sound may play depending on OS settings

### 2. App Returns to Foreground
- Recalculate remaining time from database timestamps
- Update UI immediately
- Stop any looping sounds
- Check if timer completed while in background

### 3. App Cold Start
- Initialize database
- Check for ongoing entry
- If ongoing entry exists and time remaining > 0:
  - Resume timer with calculated remaining time
- If ongoing entry exists but time elapsed:
  - Mark as complete
  - Start rest if it was a pomodoro

### 4. App Killed and Reopened
- Same as cold start
- Timer state reconstructed from database

## Technical Notes
- Use AppState from react-native
- Store timestamps, not countdown values
- Always derive remaining time from: endTime - Date.now()

## Implementation Pattern
```javascript
import { AppState } from 'react-native';

useEffect(() => {
  const subscription = AppState.addEventListener('change', nextState => {
    if (nextState === 'active') {
      // App came to foreground
      recalculateTimerState();
      stopAllSounds();
    }
  });

  return () => subscription?.remove();
}, []);

function recalculateTimerState() {
  const entry = getOngoingEntry();
  if (entry) {
    const remaining = calculateRemainingTime(entry);
    if (remaining > 0) {
      setTimeLeft(remaining);
      setIsRunning(true);
    } else {
      handleTimerComplete(entry);
    }
  }
}
```

## Acceptance Criteria
- [ ] Timer survives app backgrounding
- [ ] Timer state correct when returning to app
- [ ] Timer resumes correctly on app restart
- [ ] Completed timers are handled on return
- [ ] Sounds stop when returning to foreground
- [ ] No timer drift or inaccuracy
