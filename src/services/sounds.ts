import { Audio } from 'expo-av';

let workSound: Audio.Sound | null = null;
let restSound: Audio.Sound | null = null;
let isInitialized = false;

/**
 * Initialize audio system and configure audio mode
 */
export async function initAudio(): Promise<void> {
  if (isInitialized) return;

  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
    isInitialized = true;
  } catch (error) {
    console.warn('Failed to initialize audio:', error);
  }
}

/**
 * Load sounds into memory for quick playback
 */
export async function loadSounds(): Promise<void> {
  try {
    if (!workSound) {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/work_complete.wav')
      );
      workSound = sound;
    }

    if (!restSound) {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/rest_complete.wav')
      );
      restSound = sound;
    }
  } catch (error) {
    console.warn('Failed to load sounds:', error);
  }
}

/**
 * Play work completion sound
 * @param loop - Whether to loop the sound until stopped
 */
export async function playWorkComplete(loop: boolean = false): Promise<void> {
  try {
    if (!workSound) {
      await loadSounds();
    }
    if (workSound) {
      await workSound.setIsLoopingAsync(loop);
      await workSound.setPositionAsync(0);
      await workSound.playAsync();
    }
  } catch (error) {
    console.warn('Failed to play work complete sound:', error);
  }
}

/**
 * Play rest completion sound
 * @param loop - Whether to loop the sound until stopped
 */
export async function playRestComplete(loop: boolean = false): Promise<void> {
  try {
    if (!restSound) {
      await loadSounds();
    }
    if (restSound) {
      await restSound.setIsLoopingAsync(loop);
      await restSound.setPositionAsync(0);
      await restSound.playAsync();
    }
  } catch (error) {
    console.warn('Failed to play rest complete sound:', error);
  }
}

/**
 * Stop all playing sounds
 */
export async function stopAllSounds(): Promise<void> {
  try {
    if (workSound) {
      await workSound.stopAsync();
    }
    if (restSound) {
      await restSound.stopAsync();
    }
  } catch (error) {
    console.warn('Failed to stop sounds:', error);
  }
}

/**
 * Unload all sounds from memory (cleanup)
 */
export async function unloadSounds(): Promise<void> {
  try {
    if (workSound) {
      await workSound.unloadAsync();
      workSound = null;
    }
    if (restSound) {
      await restSound.unloadAsync();
      restSound = null;
    }
  } catch (error) {
    console.warn('Failed to unload sounds:', error);
  }
}
