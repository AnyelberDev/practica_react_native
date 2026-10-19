import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import type { FavoriteButtonSize, FavoriteButtonVariant } from './FavoriteButton.types';
import { FAVORITE_SIZES, FAVORITE_VARIANTS } from './FavoriteButton.presets';

import { Spacing } from '@/constants/theme';

export const FavoriteStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.four,
  },
});

/**
 * Compone el estilo del contenedor en un orden fijo e inmutable:
 * [base, variante, tamaño, estado, override]
 */
export function buildContainerStyle(
  isActive: boolean,
  variant: FavoriteButtonVariant,
  size: FavoriteButtonSize,
  override?: StyleProp<ViewStyle>,
): StyleProp<ViewStyle> {
  const sizeStyle = FAVORITE_SIZES[size];
  return [
    FavoriteStyles.container,
    { borderWidth: FAVORITE_VARIANTS[variant].borderWidth },
    {
      paddingVertical: sizeStyle.paddingVertical,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      gap: sizeStyle.gap,
    },
    isActive && { transform: [{ scale: 1 }] },
    override,
  ];
}
