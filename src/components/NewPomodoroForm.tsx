import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useApp } from '../services/AppContext';
import { Button } from './Button';
import { colors, borders, commonStyles } from '../styles/theme';
import { validateNewPomodoro } from '../utils/validation';
import { DEFAULT_DURATION } from '../utils/timerUtils';

export function NewPomodoroForm() {
  const { startPomodoro, setShowForm } = useApp();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(DEFAULT_DURATION.toString());
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Focus the input after a short delay for reliable focus
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    Keyboard.dismiss();

    const durationNum = parseFloat(duration);
    const validation = validateNewPomodoro(name, durationNum);

    if (!validation.valid) {
      setError(validation.error || 'Invalid input');
      return;
    }

    setError(null);
    await startPomodoro(name, durationNum);
    setName('');
    setDuration(DEFAULT_DURATION.toString());
  };

  const handleCancel = () => {
    Keyboard.dismiss();
    setName('');
    setDuration(DEFAULT_DURATION.toString());
    setError(null);
    setShowForm(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        {/* Name Input */}
        <TextInput
          ref={inputRef}
          style={[commonStyles.input, styles.nameInput]}
          placeholder="Task name"
          value={name}
          onChangeText={setName}
          maxLength={100}
        />

        {/* Duration Input */}
        <View style={styles.durationWrapper}>
          <TextInput
            style={[commonStyles.input, styles.durationInput]}
            value={duration}
            onChangeText={setDuration}
            keyboardType="decimal-pad"
            maxLength={5}
          />
          <Text style={styles.durationLabel}>minutes</Text>
        </View>

        {/* Error Message */}
        {error && <Text style={styles.error}>{error}</Text>}

        {/* Buttons */}
        <View style={styles.actions}>
          <Button
            title="Cancel"
            onPress={handleCancel}
            variant="red"
            style={styles.actionBtn}
          />
          <Button
            title="Start"
            onPress={handleSubmit}
            variant="green"
            style={styles.actionBtn}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  form: {
    backgroundColor: colors.background,
    borderWidth: borders.medium,
    borderColor: colors.border,
    padding: 15,
  },
  nameInput: {
    marginBottom: 12,
  },
  durationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 15,
  },
  durationInput: {
    width: 70,
    textAlign: 'center',
    fontFamily: 'Courier',
    fontSize: 18,
    fontWeight: '700',
  },
  durationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  error: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  actionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
