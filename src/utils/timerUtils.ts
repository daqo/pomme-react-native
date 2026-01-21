import { Entry } from '../types';

// Constants
export const DEFAULT_DURATION = 25; // minutes
export const MIN_DURATION = 0.01; // minutes
export const MAX_DURATION = 60; // minutes
export const REST_DURATION_MINUTES = 5;
export const TIMER_INTERVAL_MS = 1000;

/**
 * Convert seconds to MM:SS format
 */
export function formatTimeDisplay(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Calculate seconds remaining for an entry
 */
export function calculateRemainingTime(entry: Entry): number {
  const elapsedMs = Date.now() - entry.startedAt;
  const totalMs = entry.duration * 60 * 1000;
  const remainingMs = totalMs - elapsedMs;
  return Math.max(0, Math.floor(remainingMs / 1000));
}

/**
 * Check if an entry is currently running (not completed and has time remaining)
 */
export function isEntryOngoing(entry: Entry): boolean {
  if (entry.completed) return false;
  return calculateRemainingTime(entry) > 0;
}

/**
 * Check if an entry's time has expired (not completed but no time remaining)
 */
export function isEntryExpired(entry: Entry): boolean {
  if (entry.completed) return false;
  return calculateRemainingTime(entry) <= 0;
}

/**
 * Generate a unique ID for entries
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
