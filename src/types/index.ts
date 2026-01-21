export interface Entry {
  id: string;
  name: string;
  duration: number; // in minutes
  date: string; // YYYY-MM-DD format
  completed: boolean;
  startedAt: number; // Unix timestamp in milliseconds
  type: 'pomodoro' | 'rest';
}

export interface MonthData {
  [date: string]: number; // date string -> pomodoro count
}

export interface CalendarInfo {
  firstDayOfWeek: number; // 0 = Sunday
  totalDays: number;
}

export type ViewMode = 'day' | 'month';
