import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import type { AnimatedStyle } from 'react-native-reanimated';

/** Variante visual del botón. Nuevas variantes = nueva entrada en los maps (Open/Closed). */
export type FavoriteButtonVariant = 'Primary' | 'Secondary' | 'Danger';

/** Tamaño del botón. Union type literal, nunca `string`. */
export type FavoriteButtonSize = 'Small' | 'Medium' | 'Large';

/** Qué muestra el botón. */
export interface IFavoriteButtonContent {
  /** Texto del contador. Si se omite, se deriva del estado del hook. */
  label?: string;
  /** Accessible label para lectores de pantalla. Si se omite, se deriva del hook. */
  accessibilityLabel?: string;
}

/** Cómo interactúa el botón. */
export interface IFavoriteButtonBehavior {
  /** Conteo inicial del contador. @default 0 */
  initialCount?: number;
  /** Estado favorito inicial. @default false */
  initiallyFavorite?: boolean;
  /** Tope máximo del contador. @default 999 */
  maxCount?: number;
  /** Se dispara (con debounce) cuando cambia el estado favorito. */
  onFavoriteChange?: (isFavorite: boolean, count: number) => void;
}

/** Cómo se ve el botón. */
export interface IFavoriteButtonAppearance {
  /** Variante visual. @default 'Primary' */
  variant?: FavoriteButtonVariant;
  /** Tamaño visual. @default 'Medium' */
  size?: FavoriteButtonSize;
  /**
   * Override final del array de estilos [base, variante, tamaño, estado, override].
   * Restringe el `style` nativo de Pressable a estilo estático (sin callback).
   */
  style?: StyleProp<ViewStyle>;
}

/** Props finales: composición segregada + extiende del nativo (Liskov Substitution). */
export interface IFavoriteButtonProps
  extends Omit<PressableProps, 'style'>,
    IFavoriteButtonContent,
    IFavoriteButtonBehavior,
    IFavoriteButtonAppearance {}

/** Contrato público del hook: solo lo que el componente necesita (Interface Segregation). */
export interface UseFavoriteButtonReturn {
  isFavorite: boolean;
  count: number;
  displayLabel: string;
  iconGlyph: string;
  a11yLabel: string;
  pulseStyle: AnimatedStyle<{ transform: { scale: number }[] }>;
  toggle: () => void;
  reset: () => void;
}

/** Opciones del hook: parámetros opcionales con default (Open/Closed). */
export interface UseFavoriteButtonOptions {
  initialCount?: number;
  initiallyFavorite?: boolean;
  maxCount?: number;
  onFavoriteChange?: (isFavorite: boolean, count: number) => void;
}
