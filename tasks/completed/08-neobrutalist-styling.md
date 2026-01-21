# Task: Neobrutalist Styling System

## Description
Implement the neobrutalist design system matching the web app's visual style.

## Color Palette
```javascript
const colors = {
  background: '#fef3c7',      // Warm yellow page background
  container: '#ffffff',        // White container
  border: '#000000',          // Black borders
  shadow: '#000000',          // Black shadows

  completedWork: '#bbf7d0',   // Green - finished pomodoros
  ongoingWork: '#fde68a',     // Amber - active pomodoro
  ongoingWorkBorder: '#f59e0b', // Orange accent

  completedRest: '#e5e7eb',   // Gray - finished rest
  ongoingRest: '#bfdbfe',     // Light blue - active rest
  ongoingRestBorder: '#3b82f6', // Blue accent

  timerBg: '#fde68a',         // Yellow timer background

  buttonGreen: '#bbf7d0',     // Start button
  buttonYellow: '#fde68a',    // Pause/secondary
  buttonRed: '#fecaca',       // Reset/danger

  textPrimary: '#000000',
  textMuted: '#9ca3af',
  futureDay: '#f3f4f6',
}
```

## Typography
- Primary font: System sans-serif (Arial equivalent)
- Monospace: Courier New or system monospace (for timer)
- Font weights: 700-900 (bold to black)
- No light weights

## Neobrutalist Characteristics
- Thick black borders: 3-4px
- Large box-shadows: 3-8px offset, black color
- No border-radius (sharp corners)
- High contrast
- Strong color blocks (no gradients)
- Heavy, bold typography

## Shadow Style
```javascript
const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
}
```

## Component Styles to Create
- Container styles (main app container)
- Button styles (with press states)
- Input styles
- Card/entry styles
- Header styles
- Calendar cell styles
- Timeline styles

## Acceptance Criteria
- [ ] Color palette matches web app
- [ ] Thick black borders on all elements
- [ ] Box shadows with offset (no blur)
- [ ] Sharp corners throughout
- [ ] Bold typography
- [ ] Consistent spacing and sizing
