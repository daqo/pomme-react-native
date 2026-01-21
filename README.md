# Pomme

A beautifully crafted Pomodoro Timer app built with React Native and Expo. Features a distinctive neobrutalist design with bold colors, thick borders, and hard shadows.

> **Pomme** (French for "apple") is a playful nod to both the Pomodoro Technique (pomodoro = tomato in Italian) and the Apple ecosystem.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Architecture](#architecture)
  - [State Management](#state-management)
  - [Data Persistence](#data-persistence)
  - [Timer Logic](#timer-logic)
- [Core Components](#core-components)
- [Services](#services)
- [Styling System](#styling-system)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Core Functionality
- **Pomodoro Timer** - Configurable work sessions (0.01 to 60 minutes, default 25 min)
- **Auto Rest** - Automatic 5-minute rest period after each pomodoro
- **Background Support** - Timer continues running when app is backgrounded
- **Persistence** - Timer state survives app restarts
- **Manual Complete** - Option to mark sessions complete early

### Views
- **Day View** - Timeline showing today's pomodoro and rest entries
- **Month View** - Calendar displaying pomodoro counts per day
- **Timer View** - Fullscreen countdown display with large timer

### Notifications & Audio
- **Push Notifications** - Alerts when timer completes (works in background)
- **Custom Sounds** - Distinct chimes for work and rest completion
- **Looping Audio** - Sound continues until user interaction

### Design
- **Neobrutalist UI** - Bold colors, thick black borders, hard drop shadows
- **Color-Coded Entries** - Visual distinction between work/rest and active/completed
- **Animated LIVE Badge** - Pulsing indicator on active entries
- **Press Animations** - Tactile button feedback

---

## Screenshots

| Day View | Timer View | Month View |
|----------|------------|------------|
| Timeline of entries | Fullscreen countdown | Calendar overview |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [React Native](https://reactnative.dev/) | Cross-platform mobile framework |
| [Expo](https://expo.dev/) | Development platform and tooling |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Persistent local storage |
| [expo-av](https://docs.expo.dev/versions/latest/sdk/av/) | Audio playback |
| [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) | Push notifications |

---

## Project Structure

```
pomme-react-native/
├── App.tsx                     # Root component with AppProvider
├── app.json                    # Expo configuration
├── index.ts                    # Entry point
├── package.json
├── tsconfig.json
│
├── assets/
│   ├── icon.png                # App icon (1024x1024)
│   ├── icon.svg                # Icon source file
│   ├── adaptive-icon.png       # Android adaptive icon
│   ├── splash-icon.png         # Splash screen icon
│   ├── favicon.png             # Web favicon
│   ├── work_complete.wav       # Work session completion sound
│   └── rest_complete.wav       # Rest session completion sound
│
├── src/
│   ├── components/
│   │   ├── Button.tsx          # Reusable button with press animation
│   │   ├── DayView.tsx         # Main day view with entry timeline
│   │   ├── EntryItem.tsx       # Individual timeline entry
│   │   ├── LiveBadge.tsx       # Animated "LIVE" indicator
│   │   ├── MonthView.tsx       # Calendar month view
│   │   ├── NewPomodoroForm.tsx # Form for creating new pomodoros
│   │   └── TimerView.tsx       # Fullscreen timer display
│   │
│   ├── services/
│   │   ├── AppContext.tsx      # Global state provider
│   │   ├── database.ts         # AsyncStorage persistence layer
│   │   ├── notifications.ts    # Push notification handling
│   │   └── sounds.ts           # Audio playback service
│   │
│   ├── styles/
│   │   └── theme.ts            # Design tokens and common styles
│   │
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   │
│   └── utils/
│       ├── dateUtils.ts        # Date formatting helpers
│       ├── timerUtils.ts       # Timer calculation functions
│       └── validation.ts       # Input validation
│
└── tasks/                      # Development task tracking
    └── completed/              # Completed implementation tasks
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **Expo Go** app on your iOS/Android device (for development)
- **Xcode** (for iOS simulator/builds)
- **Android Studio** (for Android emulator/builds)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/daqo/pomme-react-native.git
   cd pomme-react-native
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   npx expo prebuild --platform ios
   cd ios && pod install && cd ..
   ```

### Running the App

#### Development with Expo Go
```bash
npx expo start
```
Scan the QR code with Expo Go (iOS) or the Expo app (Android).

#### iOS Simulator
```bash
npx expo run:ios
```

#### Android Emulator
```bash
npx expo run:android
```

#### Web (limited functionality)
```bash
npx expo start --web
```

---

## Architecture

### State Management

The app uses React Context (`AppContext.tsx`) for global state management. This provides:

```typescript
interface AppContextType {
  // Database state
  dbReady: boolean;

  // View state
  view: ViewMode;              // 'day' | 'month' | 'timer'
  currentDate: Date;           // Currently selected date
  showTimer: boolean;          // Timer view visibility
  showForm: boolean;           // New pomodoro form visibility

  // Data
  entries: Entry[];            // Entries for current date
  monthData: MonthData;        // Pomodoro counts by date

  // Timer state
  activeEntry: Entry | null;   // Currently running entry
  timeLeft: number;            // Seconds remaining
  isRunning: boolean;          // Timer active flag
  isSoundPlaying: boolean;     // Audio playing flag

  // Actions
  startPomodoro: (name: string, duration: number) => Promise<void>;
  markComplete: () => Promise<void>;
  refreshData: () => void;
  stopSounds: () => void;
}
```

### Data Persistence

Data is stored in AsyncStorage with the following structure:

```typescript
interface Entry {
  id: string;                  // UUID
  name: string;                // Task name (1-100 chars)
  duration: number;            // Duration in minutes
  date: string;                // YYYY-MM-DD format
  completed: boolean;          // Completion status
  startedAt: number;           // Unix timestamp (ms)
  type: 'pomodoro' | 'rest';   // Entry type
}
```

**Storage Keys:**
- `@pomme/entries` - Array of all entries

### Timer Logic

The timer system handles several scenarios:

1. **Active Timer** - Calculates remaining time from `startedAt + duration`
2. **Background** - Timer continues via timestamp comparison on foreground
3. **App Restart** - Checks for ongoing/expired entries on launch
4. **Completion** - Triggers sound, notification, and auto-rest

```typescript
// Timer calculation
const endTime = entry.startedAt + (entry.duration * 60 * 1000);
const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
```

---

## Core Components

### DayView
The main view showing today's date and a timeline of entries. Features:
- Date navigation (previous/next day)
- Scrollable entry list
- "New Pomodoro" button
- Tap entry to open timer view

### TimerView
Fullscreen countdown display with:
- Large monospace timer (MM:SS format)
- Task name display
- "Mark Complete" button
- Animated glow effect on active timer
- Sound stop button when audio playing

### MonthView
Calendar grid showing:
- Current month with navigation
- Pomodoro count badges per day
- Tap day to view entries
- Future days grayed out

### EntryItem
Individual timeline entry showing:
- Time (start time)
- Task name
- Duration
- Color-coded background (green=completed work, amber=active work, gray=completed rest, blue=active rest)
- LIVE badge for active entries

### NewPomodoroForm
Modal form for creating pomodoros:
- Task name input (1-100 characters)
- Duration input (0.01-60 minutes)
- Validation with error messages
- Start button

---

## Services

### database.ts
Persistence layer wrapping AsyncStorage:
```typescript
initDatabase()              // Initialize and load data
addPomodoro(name, duration, date)  // Create new pomodoro
addRest(date)              // Create rest entry
completeEntry(id)          // Mark entry complete
getEntriesForDate(date)    // Get entries for a date
getPomodorosForMonth(year, month)  // Get counts for calendar
getOngoingEntry()          // Find active entry
getExpiredEntry()          // Find completed but unprocessed entry
```

### sounds.ts
Audio playback service:
```typescript
initAudio()                // Configure audio mode
loadSounds()               // Preload sound files
playWorkComplete(loop)     // Play work completion chime
playRestComplete(loop)     // Play rest completion chime
stopAllSounds()            // Stop and reset audio
```

### notifications.ts
Push notification handling:
```typescript
requestNotificationPermissions()   // Request user permission
scheduleTimerNotification(type, name, seconds)  // Schedule notification
cancelScheduledNotification()      // Cancel pending notification
cancelAllNotifications()           // Cancel all notifications
```

---

## Styling System

The app uses a consistent neobrutalist design system defined in `theme.ts`:

### Colors
```typescript
colors = {
  background: '#fef3c7',      // Warm cream
  container: '#ffffff',        // White
  border: '#000000',           // Black

  completedWork: '#bbf7d0',    // Light green
  ongoingWork: '#fde68a',      // Amber
  ongoingWorkBorder: '#f59e0b',

  completedRest: '#e5e7eb',    // Light gray
  ongoingRest: '#bfdbfe',      // Light blue
  ongoingRestBorder: '#3b82f6',

  buttonGreen: '#bbf7d0',
  buttonYellow: '#fde68a',
  buttonRed: '#fecaca',

  liveBadge: '#ef4444',        // Red
}
```

### Shadows
Neobrutalist hard shadows with no blur:
```typescript
shadows = {
  small:  { offset: { width: 3, height: 3 }, radius: 0 },
  medium: { offset: { width: 5, height: 5 }, radius: 0 },
  large:  { offset: { width: 8, height: 8 }, radius: 0 },
}
```

### Borders
Thick, bold borders:
```typescript
borders = {
  thin: 2,
  medium: 3,
  thick: 4,
}
```

---

## Configuration

### app.json
Key configuration options:

```json
{
  "expo": {
    "name": "Pomme",
    "slug": "pomme",
    "ios": {
      "bundleIdentifier": "com.pomme.timer",
      "supportsTablet": true,
      "infoPlist": {
        "UIBackgroundModes": ["audio"]
      }
    },
    "android": {
      "package": "com.pomme.timer"
    },
    "plugins": [
      ["expo-notifications", {
        "sounds": ["./assets/work_complete.wav", "./assets/rest_complete.wav"]
      }],
      ["expo-av", { "microphonePermission": false }]
    ]
  }
}
```

### Timer Defaults
Defined in `timerUtils.ts`:
```typescript
DEFAULT_POMODORO_MINUTES = 25
REST_DURATION_MINUTES = 5
MIN_DURATION = 0.01
MAX_DURATION = 60
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all new files
- Follow existing patterns for components and services
- Use the theme system for all styling
- Add proper types for all props and state

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Acknowledgments

- Inspired by the [Pomodoro Technique](https://francescocirillo.com/pages/pomodoro-technique) by Francesco Cirillo
- Built with [Expo](https://expo.dev/)
- Neobrutalist design inspiration from various UI/UX communities

---

**Made with focus and determination.**
