import type { FavoriteButtonSize, FavoriteButtonVariant } from './FavoriteButton.types';

import { Spacing, type ThemeColor } from '@/constants/theme';

/** Colores resueltos por token de theme (Dependency Inversion: nunca literales hex). */
export interface IFavoriteVariantColors {
  containerIdle: ThemeColor;
  containerActive: ThemeColor;
  textIdle: ThemeColor;
  textActive: ThemeColor;
}

/** Paleta de tokens del theme inyectada al resolver estilos (DIP). */
export type FavoriteThemeColors = Record<ThemeColor, string>;

/** Map de variantes: agregar variante = nueva entrada, sin tocar el núcleo (Open/Closed). */
export const FAVORITE_VARIANT_COLORS: Record<FavoriteButtonVariant, IFavoriteVariantColors> = {
  Primary: {
    containerIdle: 'backgroundElement',
    containerActive: 'tint',
    textIdle: 'textSecondary',
    textActive: 'background',
  },
  Secondary: {
    containerIdle: 'backgroundSelected',
    containerActive: 'backgroundElement',
    textIdle: 'textSecondary',
    textActive: 'text',
  },
  Danger: {
    containerIdle: 'backgroundElement',
    containerActive: 'tintDanger',
    textIdle: 'textSecondary',
    textActive: 'background',
  },
};

export interface IFavoriteVariantStyle {
  fontWeight: '500' | '600';
  borderWidth: number;
}

export const FAVORITE_VARIANTS: Record<FavoriteButtonVariant, IFavoriteVariantStyle> = {
  Primary: { fontWeight: '600', borderWidth: 1 },
  Secondary: { fontWeight: '500', borderWidth: 1 },
  Danger: { fontWeight: '600', borderWidth: 1 },
};

export interface IFavoriteSizeStyle {
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
  iconSize: number;
  gap: number;
}

/** Map de tamaños: agregar tamaño = nueva entrada (Open/Closed). */
export const FAVORITE_SIZES: Record<FavoriteButtonSize, IFavoriteSizeStyle> = {
  Small: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    fontSize: 12,
    iconSize: 14,
    gap: Spacing.one,
  },
  Medium: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 14,
    iconSize: 18,
    gap: Spacing.two,
  },
  Large: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    fontSize: 16,
    iconSize: 24,
    gap: Spacing.two,
  },
};
