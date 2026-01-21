# Task: Timer View Component (Fullscreen)

## Description
Implement the fullscreen timer view that displays when a timer is active and focused.

## UI Elements
- Large countdown display (MM:SS format)
- Task name
- Label: "Work Time" or "Rest Time"
- "Mark Complete" button - force-complete current timer
- "Back" button - return to day view (timer continues)

## Styling
- Timer display: Large monospace font (2.8rem equivalent)
- Yellow background (#fde68a) for timer area
- Bold neobrutalist styling with thick borders
- Centered layout

## Timer Display
- Format: MM:SS (e.g., "24:59")
- Updates every second
- Uses monospace font (Courier New equivalent)
- Shows 00:00 when complete (briefly before transitioning)

## Interactions
- "Mark Complete" → immediately complete timer, trigger next phase
- "Back" → return to day view, timer continues running
- Timer hits 0 → auto-complete, play sound, show notification

## Technical Notes
- Timer continues even when not on this view
- Recalculate time when view opens (in case of background)
- Use large touch targets for buttons

## Acceptance Criteria
- [ ] Large timer display updates every second
- [ ] Shows correct task name
- [ ] Distinguishes work vs rest time
- [ ] Mark Complete immediately finishes timer
- [ ] Back button returns to day view
- [ ] Timer continues running after Back pressed
