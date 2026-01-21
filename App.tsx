import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { AppProvider, useApp } from './src/services/AppContext';
import { DayView } from './src/components/DayView';
import { MonthView } from './src/components/MonthView';
import { TimerView } from './src/components/TimerView';
import { NewPomodoroForm } from './src/components/NewPomodoroForm';
import { colors, borders, shadows } from './src/styles/theme';

function AppContent() {
  const { dbReady, view, showTimer, showForm, activeEntry } = useApp();

  if (!dbReady) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* App Title */}
        <Text style={styles.title}>Pomodoro</Text>

        {/* Main Content */}
        {showTimer && activeEntry ? (
          <TimerView />
        ) : (
          <>
            {showForm && <NewPomodoroForm />}
            {view === 'day' ? <DayView /> : <MonthView />}
          </>
        )}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppProvider>
        <AppContent />
        <StatusBar style="auto" />
      </AppProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: colors.container,
    borderWidth: borders.thick,
    borderColor: colors.border,
    ...shadows.large,
    padding: 30,
    width: '100%',
    maxWidth: 360,
    flex: 1,
    maxHeight: 600,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 20,
    color: colors.textPrimary,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
