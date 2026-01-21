# Pomodoro Timer - React Native App

A React Native implementation of the Pomodoro Timer web app with neobrutalist styling.

**Source Reference:** `/Users/daqo/Documents/Documents - stoic/Projects/pomodoro`
**Web Version:** https://daqo.github.io/pomodoro/

---

# Implementation Plan

## Tech Stack
- **Framework:** React Native with Expo (TypeScript)
- **Storage:** AsyncStorage for persistent data
- **Audio:** expo-av
- **Notifications:** expo-notifications
- **Animations:** React Native Animated API

## Project Structure
```
pomodoro-RN/
├── App.tsx                    # Main app component
├── src/
│   ├── components/
│   │   ├── DayView.tsx        # Day view with timeline
│   │   ├── MonthView.tsx      # Calendar month view
│   │   ├── TimerView.tsx      # Fullscreen timer
│   │   ├── EntryItem.tsx      # Timeline entry component
│   │   ├── NewPomodoroForm.tsx# Form for new entries
│   │   ├── Button.tsx         # Styled button component
│   │   └── LiveBadge.tsx      # Animated LIVE badge
│   ├── services/
│   │   ├── database.ts        # Storage layer (AsyncStorage)
│   │   ├── sounds.ts          # Audio playback
│   │   └── notifications.ts   # Push notifications
│   ├── utils/
│   │   ├── dateUtils.ts       # Date formatting utilities
│   │   ├── timerUtils.ts      # Timer calculations
│   │   └── validation.ts      # Input validation
│   ├── styles/
│   │   └── theme.ts           # Neobrutalist design tokens
│   └── types/
│       └── index.ts           # TypeScript interfaces
├── assets/
│   ├── work-complete.wav      # Work completion sound
│   └── rest-complete.wav      # Rest completion sound
└── tasks/                     # Task tracking
    ├── not-started/
    ├── ongoing/
    └── completed/
```

## Implementation Phases

### Phase 1: Foundation (Tasks 01, 03, 13)
1. Set up project structure and folders
2. Implement utility functions (date formatting, timer calculations)
3. Implement database/storage layer with AsyncStorage
4. Set up basic state management

### Phase 2: Core UI (Tasks 04, 05, 06, 07, 08)
1. Implement neobrutalist styling system (colors, shadows, typography)
2. Build Day View component with timeline
3. Build Month View component with calendar
4. Build Timer View (fullscreen countdown)
5. Build New Pomodoro form

### Phase 3: Timer Logic (Tasks 02, 12)
1. Implement core timer countdown logic
2. Implement auto-rest after pomodoro completion
3. Handle app lifecycle (background/foreground)
4. Ensure timer survives app restart

### Phase 4: Polish (Tasks 09, 10, 11)
1. Add sound effects on completion
2. Implement push notifications
3. Add animations (button press, LIVE badge pulse, glow effects)

---

# Feature List (from Web App Analysis)

## Core Features
- [x] Pomodoro timer with configurable duration (default 25 min, range 0.01-60 min)
- [x] Automatic 5-minute rest period after each pomodoro
- [x] Timer continues in background
- [x] Timer state persists across app restarts
- [x] Manual "Mark Complete" option

## Views
- **Day View:** Shows today's date with timeline of entries
- **Month View:** Calendar showing pomodoro counts per day
- **Timer View:** Fullscreen countdown display

## Data Model
```typescript
interface Entry {
  id: string;
  name: string;           // Task name (1-100 chars)
  duration: number;       // Duration in minutes
  date: string;           // YYYY-MM-DD format
  completed: boolean;
  startedAt: number;      // Unix timestamp (ms)
  type: 'pomodoro' | 'rest';
}
```

## UI/UX Features
- Neobrutalist design (thick borders, bold colors, no rounded corners)
- Color-coded entries (green=completed work, amber=active work, gray=completed rest, blue=active rest)
- "LIVE" badge with pulse animation on active entries
- Timeline visualization with dots and vertical line
- Navigation between days and months

## Notifications & Audio
- Sound plays on timer completion
- Push notification when timer completes (works in background)
- Notification shows task name

---

# Tasks Created

See `tasks/not-started/` folder for detailed task specifications:

| # | Task | Description |
|---|------|-------------|
| 01 | Database & Storage | AsyncStorage persistence layer |
| 02 | Core Timer Logic | Countdown, auto-rest, background timing |
| 03 | State Management | App-wide state handling |
| 04 | Day View Component | Timeline of today's entries |
| 05 | Month View Component | Calendar with pomodoro counts |
| 06 | Timer View Component | Fullscreen countdown |
| 07 | New Pomodoro Form | Entry creation form |
| 08 | Neobrutalist Styling | Design system implementation |
| 09 | Sound/Audio System | Completion sounds |
| 10 | Push Notifications | Background alerts |
| 11 | Animations | Micro-interactions |
| 12 | App Lifecycle | Background/foreground handling |
| 13 | Utility Functions | Shared helper functions |

---

# Status

**Project Setup:** Complete
**Task Planning:** Complete
**Ready for Review**

---

# Original Requirements
1. Start a React Native project that is incorporated in git. Let's set it up with the best practices for a RN app
2. The requirements must be exact the same as the web version of the app (path provided above)
3. You must test the web version of app (hosted here: https://daqo.github.io/pomodoro/) and from there create a list of features. From there you need to write different tasks and add them to ~tasks/not-started folder to enable the same exact behavior of the web app. add the same time update this file with a through plan of how you are planning to create the app.
4. Once done, let me know so i can review the plan and let you know what to do after.
