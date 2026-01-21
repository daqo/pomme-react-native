import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Store the scheduled notification ID so we can cancel it
let scheduledNotificationId: string | null = null;

/**
 * Configure notification behavior
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Request notification permissions
 * @returns Whether permission was granted
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    if (existingStatus === 'granted') {
      return true;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.warn('Failed to request notification permissions:', error);
    return false;
  }
}

/**
 * Schedule a notification for when timer completes
 * @param type - 'pomodoro' or 'rest'
 * @param taskName - Name of the task (for pomodoro)
 * @param triggerSeconds - Seconds until notification should trigger
 */
export async function scheduleTimerNotification(
  type: 'pomodoro' | 'rest',
  taskName: string,
  triggerSeconds: number
): Promise<void> {
  try {
    // Cancel any existing scheduled notification
    await cancelScheduledNotification();

    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      return;
    }

    const title = type === 'pomodoro' ? 'Work Complete!' : 'Rest Complete!';
    const body = type === 'pomodoro' ? taskName : 'Ready to work?';
    // Use custom sound file without extension (iOS convention)
    const soundFile = type === 'pomodoro' ? 'work_complete' : 'rest_complete';

    scheduledNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: soundFile,
        data: { type },
      },
      trigger: {
        seconds: Math.max(1, Math.floor(triggerSeconds)),
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      },
    });
  } catch (error) {
    console.warn('Failed to schedule notification:', error);
  }
}

/**
 * Cancel the currently scheduled notification (if any)
 */
export async function cancelScheduledNotification(): Promise<void> {
  try {
    if (scheduledNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(scheduledNotificationId);
      scheduledNotificationId = null;
    }
  } catch (error) {
    console.warn('Failed to cancel notification:', error);
  }
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    scheduledNotificationId = null;
  } catch (error) {
    console.warn('Failed to cancel all notifications:', error);
  }
}
