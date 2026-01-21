# Task: State Management

## Description
Implement app-wide state management for views, timer state, and UI state.

## State Variables
- `dbReady: boolean` - Database initialization complete
- `view: 'day' | 'month'` - Current view mode
- `currentDate: Date` - Selected date for viewing
- `pomodoros: Entry[]` - Entries for current date
- `monthData: Record<string, number>` - Pomodoro counts by date for month
- `activeEntry: Entry | null` - Currently running timer
- `timeLeft: number` - Seconds remaining on active timer
- `isRunning: boolean` - Timer actively counting
- `showTimer: boolean` - Show fullscreen timer view
- `showForm: boolean` - Show new pomodoro form
- `newName: string` - Form input for name
- `newDuration: number` - Form input for duration

## Data Flow
1. Database is source of truth for entries
2. After any DB mutation, refresh relevant state from DB
3. Timer state (timeLeft, isRunning) is derived from activeEntry
4. UI state (showTimer, showForm) is local component state

## Functions to Implement
- `refreshCurrentDateData()` - Reload pomodoros for current date
- `refreshMonthData()` - Reload month statistics
- `checkForOngoingEntry()` - Check DB for active timer on app load
- `handleViewChange(view)` - Switch between day/month views
- `handleDateChange(date)` - Navigate to different date

## Technical Notes
- Use React useState/useContext or simple state management
- Avoid over-engineering - the web app uses plain useState
- Use useCallback for event handlers
- Use useMemo for derived values

## Acceptance Criteria
- [ ] View switching works correctly
- [ ] Date navigation updates displayed data
- [ ] Active timer state is correctly tracked
- [ ] Form state resets appropriately
- [ ] State syncs with database after mutations
