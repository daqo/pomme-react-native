# Task: Day View Component

## Description
Implement the main day view showing today's date and a timeline of pomodoro/rest entries.

## UI Elements
- Header showing full date (e.g., "Monday, January 20, 2025")
- Timeline with vertical line and circular dots for each entry
- Each entry shows:
  - Colored dot (state-dependent)
  - Name of task (or "Rest" for rest entries)
  - Duration or remaining time
  - Checkmark if completed
  - "LIVE" badge if currently active
- "+ New Pomodoro" button (only on today's date)
- View toggle buttons (Day/Month)

## Entry States & Colors
| State | Background | Border | Dot Color |
|-------|------------|--------|-----------|
| Completed Pomodoro | #bbf7d0 (green) | black | green |
| Ongoing Pomodoro | #fde68a (amber) | #f59e0b | orange with glow |
| Completed Rest | #e5e7eb (gray) | black | gray |
| Ongoing Rest | #bfdbfe (blue) | #3b82f6 | blue with glow |

## Interactions
- Tap on ongoing entry → navigate to fullscreen timer view
- Tap "+ New Pomodoro" → show form
- Tap "Month" → switch to month view

## Restrictions
- New pomodoro button only visible on today's date
- Past and future dates are view-only

## Technical Notes
- Use FlatList or ScrollView for entry list
- Entry component should be reusable
- Handle empty state (no entries for the day)

## Acceptance Criteria
- [ ] Displays correct date header
- [ ] Shows all entries for selected date
- [ ] Entry colors match state correctly
- [ ] LIVE badge shows on active entry
- [ ] Tapping active entry opens timer view
- [ ] New pomodoro button only shows for today
