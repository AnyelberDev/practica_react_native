import type { AnimatedStyle } from 'react-native-reanimated';
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

interface IUseFavoritePulseReturn {
  pulseStyle: AnimatedStyle<{ transform: { scale: number }[] }>;
}

/**
 * Emite un pulso (scale spring) cada vez que cambia el valor observado.
 * Responsabilidad única: animación de feedback (Single Responsibility).
 */
export function useFavoritePulse(observedValue: number): IUseFavoritePulseReturn {
  const pulse = useSharedValue(1);

  useAnimatedReaction(
    () => observedValue,
    (current, previous) => {
      if (previous !== null && current !== previous) {
        pulse.value = withSequence(
          withSpring(1.3, { damping: 6, stiffness: 220 }),
          withSpring(1, { damping: 10 }),
        );
      }
    },
    [observedValue],
  );

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return { pulseStyle };
}
