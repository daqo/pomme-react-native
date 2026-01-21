# Task: Month View Component

## Description
Implement the calendar month view showing pomodoro counts per day.

## UI Elements
- Month/Year header (e.g., "January 2025")
- Navigation arrows (← →) to move between months
- Weekday headers (Sun, Mon, Tue, Wed, Thu, Fri, Sat)
- 7-column grid of day cells
- Each cell shows:
  - Day number (top-left)
  - Completed pomodoro count (if > 0)
- View toggle buttons (Day/Month)

## Day Cell States
| State | Background | Text Color |
|-------|------------|------------|
| Today | #fde68a (amber) | black |
| Past days | white | black |
| Future days | #f3f4f6 (gray) | #9ca3af (muted) |
| Days from other months | transparent | very muted |

## Interactions
- Tap on any day → switch to day view for that date
- Tap ← → arrows → navigate months
- Tap "Day" → switch back to day view (current date)

## Helper Functions
- `getMonthCalendarInfo(date)` - Returns first day of week and total days in month
- `formatDateToString(date)` - Returns YYYY-MM-DD string

## Technical Notes
- Use FlatList with numColumns={7} or custom grid
- Calculate correct starting position for day 1
- Include trailing/leading days from adjacent months (grayed out)
- Month navigation should not allow navigation to invalid dates

## Acceptance Criteria
- [ ] Calendar displays correct days for any month
- [ ] Today is highlighted
- [ ] Future days are grayed out
- [ ] Pomodoro counts display correctly
- [ ] Tapping day navigates to day view
- [ ] Month navigation works correctly
