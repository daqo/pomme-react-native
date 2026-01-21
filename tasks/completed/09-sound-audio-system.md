# Task: Sound/Audio System

## Description
Implement audio playback for timer completion sounds.

## Audio Files Needed
- `work-complete.wav` - Plays when pomodoro completes
- `rest-complete.wav` - Plays when rest period completes

## Functions to Implement
- `initAudio()` - Initialize audio system
- `playWorkComplete(loop?)` - Play work completion sound
- `playRestComplete(loop?)` - Play rest completion sound
- `stopAllSounds()` - Stop all playing audio

## Playback Behavior
- Sound plays when timer reaches 0
- Sound can loop continuously until user interacts
- Sound stops when:
  - User returns to app (from background)
  - User taps any button
  - Next timer phase starts

## Technical Notes
- Use expo-av for audio playback
- Copy audio files from web app's public folder
- Handle audio playback errors gracefully
- Consider audio focus/interruption handling

## Audio Library Setup
```bash
npx expo install expo-av
```

## Implementation Pattern
```javascript
import { Audio } from 'expo-av';

let workSound = null;
let restSound = null;

async function loadSounds() {
  workSound = new Audio.Sound();
  await workSound.loadAsync(require('./assets/work-complete.wav'));

  restSound = new Audio.Sound();
  await restSound.loadAsync(require('./assets/rest-complete.wav'));
}
```

## Acceptance Criteria
- [ ] Work completion sound plays correctly
- [ ] Rest completion sound plays correctly
- [ ] Sounds can loop when specified
- [ ] stopAllSounds() stops all playback
- [ ] Audio plays even when app is in background
- [ ] Errors are handled gracefully
