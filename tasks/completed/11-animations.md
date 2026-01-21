# Task: Animations

## Description
Implement animations matching the web app's micro-interactions.

## Animations to Implement

### 1. Button Press Animation
- **Hover/Press In**: translate(-2px, -2px), increase shadow
- **Press Out/Active**: translate(2px, 2px), decrease shadow
- **Duration**: 0.1s
- Creates tactile "pressed" feel

### 2. LIVE Badge Pulse
- Scale: 1 → 1.1 → 1
- Duration: 1s cycle
- Infinite loop
- Applied to red "LIVE" badge on active entries

### 3. Timeline Dot Glow
- Ongoing pomodoro: Orange glow pulse
- Ongoing rest: Blue glow pulse
- Glow expands and contracts
- Duration: 1.5s cycle

### 4. Active Entry Scale
- Active entries have scale(1.02)
- Subtle zoom to draw attention

## Technical Notes
- Use React Native Animated API
- Consider react-native-reanimated for better performance
- Use useNativeDriver where possible
- Animations should loop smoothly

## Implementation Pattern
```javascript
import { Animated, Easing } from 'react-native';

// Pulse animation
const pulseAnim = useRef(new Animated.Value(1)).current;

useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);
```

## Acceptance Criteria
- [ ] Button press animation feels tactile
- [ ] LIVE badge pulses continuously
- [ ] Active entry dots have glow effect
- [ ] Animations are smooth (60fps)
- [ ] Animations don't cause performance issues
