import type { TextStyle } from 'react-native';

import type { FavoriteButtonSize, FavoriteButtonVariant } from './FavoriteButton.types';
import {
  FAVORITE_SIZES,
  FAVORITE_VARIANTS,
  FAVORITE_VARIANT_COLORS,
  type FavoriteThemeColors,
} from './FavoriteButton.presets';

/** Resuelve el estilo del icono a partir de tokens + estado (sin literales en el .tsx). */
export function resolveIconStyle(
  theme: FavoriteThemeColors,
  isActive: boolean,
  variant: FavoriteButtonVariant,
  size: FavoriteButtonSize,
): TextStyle {
  const tokens = FAVORITE_VARIANT_COLORS[variant];
  return {
    textAlign: 'center',
    fontSize: FAVORITE_SIZES[size].iconSize,
    color: theme[isActive ? tokens.textActive : tokens.textIdle],
  };
}

/** Resuelve el estilo de la label a partir de tokens + estado (sin literales en el .tsx). */
export function resolveLabelStyle(
  theme: FavoriteThemeColors,
  isActive: boolean,
  variant: FavoriteButtonVariant,
  size: FavoriteButtonSize,
): TextStyle {
  const tokens = FAVORITE_VARIANT_COLORS[variant];
  return {
    fontVariant: ['tabular-nums'],
    fontWeight: FAVORITE_VARIANTS[variant].fontWeight,
    fontSize: FAVORITE_SIZES[size].fontSize,
    color: theme[isActive ? tokens.textActive : tokens.textIdle],
  };
}
