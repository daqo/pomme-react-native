# Task: New Pomodoro Form

## Description
Implement the form for creating new pomodoro entries.

## UI Elements
- Text input for task name
  - Placeholder: "Task name"
  - Max length: 100 characters
  - Required field
- Number input for duration
  - Default: 25 minutes
  - Range: 0.01 - 60 minutes
  - Label: "Duration (minutes)"
- "Start" button - create and start timer
- "Cancel" button - close form without creating

## Validation
- Name: Required, 1-100 characters after trimming
- Duration: Required, must be number between 0.01 and 60
- Show validation errors if invalid

## Form Flow
1. User taps "+ New Pomodoro"
2. Form appears with default values
3. User enters name and optionally changes duration
4. User taps "Start":
   - Validate inputs
   - Create entry in database with current timestamp
   - Switch to fullscreen timer view
   - Start timer countdown
5. User taps "Cancel":
   - Close form
   - Reset form state

## Technical Notes
- Use React Native TextInput components
- Keyboard should dismiss on form submit
- Consider KeyboardAvoidingView for form
- Reset form values after successful submission

## Acceptance Criteria
- [ ] Name input accepts text up to 100 chars
- [ ] Duration input accepts valid numbers
- [ ] Validation prevents invalid submissions
- [ ] Start creates entry and opens timer
- [ ] Cancel closes form and resets state
- [ ] Keyboard dismisses appropriately
