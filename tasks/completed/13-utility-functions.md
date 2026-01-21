# Task: Utility Functions

## Description
Implement shared utility functions used throughout the app.

## Date Utilities

### formatDateToString(date: Date): string
Convert Date object to YYYY-MM-DD string
```javascript
function formatDateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
```

### formatTimeDisplay(totalSeconds: number): string
Convert seconds to MM:SS format
```javascript
function formatTimeDisplay(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
```

### getMonthCalendarInfo(date: Date): { firstDayOfWeek: number, totalDays: number }
Get calendar layout info for a month
```javascript
function getMonthCalendarInfo(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  return {
    firstDayOfWeek: firstDay.getDay(), // 0 = Sunday
    totalDays: lastDay.getDate(),
  };
}
```

### getFullDateString(date: Date): string
Format date for display (e.g., "Monday, January 20, 2025")
```javascript
function getFullDateString(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
```

## Timer Utilities

### calculateRemainingTime(entry): number
Calculate seconds remaining for an entry
```javascript
function calculateRemainingTime(entry) {
  const elapsedMs = Date.now() - entry.startedAt;
  const totalMs = entry.duration * 60 * 1000;
  const remainingMs = totalMs - elapsedMs;
  return Math.max(0, Math.floor(remainingMs / 1000));
}
```

### isEntryOngoing(entry): boolean
Check if an entry is currently running
```javascript
function isEntryOngoing(entry) {
  if (entry.completed) return false;
  return calculateRemainingTime(entry) > 0;
}
```

## Validation Utilities

### validatePomodoroName(name: string): { valid: boolean, error?: string }
### validateDuration(duration: number): { valid: boolean, error?: string }

## Acceptance Criteria
- [ ] All date formatting functions work correctly
- [ ] Time display shows correct MM:SS format
- [ ] Calendar info calculates correctly for any month
- [ ] Timer calculations are accurate
- [ ] Validation functions catch all edge cases
