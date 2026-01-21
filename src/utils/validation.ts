import { MIN_DURATION, MAX_DURATION } from './timerUtils';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate pomodoro name
 */
export function validatePomodoroName(name: string): ValidationResult {
  const trimmed = name.trim();

  if (!trimmed) {
    return { valid: false, error: 'Task name is required' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Task name must be 100 characters or less' };
  }

  return { valid: true };
}

/**
 * Validate duration
 */
export function validateDuration(duration: number): ValidationResult {
  if (isNaN(duration)) {
    return { valid: false, error: 'Duration must be a number' };
  }

  if (duration < MIN_DURATION) {
    return { valid: false, error: `Duration must be at least ${MIN_DURATION} minutes` };
  }

  if (duration > MAX_DURATION) {
    return { valid: false, error: `Duration must be at most ${MAX_DURATION} minutes` };
  }

  return { valid: true };
}

/**
 * Validate both name and duration for new pomodoro
 */
export function validateNewPomodoro(name: string, duration: number): ValidationResult {
  const nameResult = validatePomodoroName(name);
  if (!nameResult.valid) return nameResult;

  const durationResult = validateDuration(duration);
  if (!durationResult.valid) return durationResult;

  return { valid: true };
}
