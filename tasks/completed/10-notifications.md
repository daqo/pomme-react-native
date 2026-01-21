# Task: Push Notifications

## Description
Implement local push notifications for timer completion alerts.

## Notification Triggers
1. **Pomodoro Complete**
   - Title: "Work Complete!"
   - Body: "{task name}"
   - Triggered when work timer reaches 0

2. **Rest Complete**
   - Title: "Rest Complete!"
   - Body: "Ready to work?"
   - Triggered when rest timer reaches 0

## Features
- Notifications work when app is in background
- Tapping notification brings app to foreground
- Request notification permissions on first timer start

## Technical Notes
- Use expo-notifications for local notifications
- Schedule notification when timer starts (calculated end time)
- Cancel scheduled notification if timer is manually completed
- Handle permission requests gracefully

## Library Setup
```bash
npx expo install expo-notifications
```

## Implementation Pattern
```javascript
import * as Notifications from 'expo-notifications';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request permissions
async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// Schedule notification
async function scheduleNotification(title, body, triggerSeconds) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { seconds: triggerSeconds },
  });
}
```

## Acceptance Criteria
- [ ] Permissions requested appropriately
- [ ] Notification appears when pomodoro completes
- [ ] Notification appears when rest completes
- [ ] Notifications work in background
- [ ] Tapping notification opens app
- [ ] Scheduled notifications can be cancelled
