import React, { useCallback } from 'react';
import { Pressable, Text, type GestureResponderEvent } from 'react-native';
import Animated from 'react-native-reanimated';

import type { IFavoriteButtonProps } from './FavoriteButton.types';
import { buildContainerStyle } from './FavoriteButton.styles';
import { resolveIconStyle, resolveLabelStyle } from './FavoriteButton.resolvers';
import { useFavoriteButton } from './useFavoriteButton';

import { useTheme } from '@/hooks/use-theme';

/**
 * FavoriteButton — SOLO presentación:
 * JSX + composición de estilos. Toda la lógica vive en useFavoriteButton.
 */
export const FavoriteButton: React.FC<IFavoriteButtonProps> = ({
  label,
  accessibilityLabel,
  initialCount,
  initiallyFavorite,
  maxCount,
  onFavoriteChange,
  variant = 'Primary',
  size = 'Medium',
  onPress,
  style,
  ...rest
}) => {
  const theme = useTheme();
  const { isFavorite, displayLabel, iconGlyph, a11yLabel, pulseStyle, toggle } = useFavoriteButton({
    initialCount,
    initiallyFavorite,
    maxCount,
    onFavoriteChange,
  });

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      toggle();
      onPress?.(event);
    },
    [toggle, onPress],
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isFavorite }}
      accessibilityLabel={accessibilityLabel ?? a11yLabel}
      onPress={handlePress}
      style={buildContainerStyle(isFavorite, variant, size, style)}
      {...rest}>
      <Animated.Text style={[resolveIconStyle(theme, isFavorite, variant, size), pulseStyle]}>
        {iconGlyph}
      </Animated.Text>
      <Text style={resolveLabelStyle(theme, isFavorite, variant, size)}>{label ?? displayLabel}</Text>
    </Pressable>
  );
};
