import { useCallback, useMemo, useReducer } from 'react';

import type { UseFavoriteButtonOptions, UseFavoriteButtonReturn } from './FavoriteButton.types';
import { favoriteReducer } from './FavoriteButton.reducer';
import { useFavoriteChangeNotifier } from './useFavoriteChangeNotifier';
import { useFavoritePulse } from './useFavoritePulse';

/**
 * useFavoriteButton — orquesta toda la lógica del botón favorito.
 * El componente solo renderiza. Nunca expone setters crudos (Interface Segregation).
 */
export function useFavoriteButton({
  initialCount = 0,
  initiallyFavorite = false,
  maxCount = 999,
  onFavoriteChange,
}: UseFavoriteButtonOptions = {}): UseFavoriteButtonReturn {
  const [state, dispatch] = useReducer(favoriteReducer, {
    isFavorite: initiallyFavorite,
    count: Math.min(Math.max(initialCount, 0), maxCount),
  });

  useFavoriteChangeNotifier({
    isFavorite: state.isFavorite,
    count: state.count,
    onFavoriteChange,
  });

  const { pulseStyle } = useFavoritePulse(state.count);

  const toggle = useCallback(() => {
    dispatch({ type: 'toggle', maxCount });
  }, [maxCount]);

  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  const displayLabel = useMemo(() => String(state.count), [state.count]);

  const iconGlyph = useMemo(() => (state.isFavorite ? '♥' : '♡'), [state.isFavorite]);

  const a11yLabel = useMemo(
    () =>
      state.isFavorite
        ? `Quitar de favoritos, ${state.count}`
        : `Añadir a favoritos, ${state.count}`,
    [state.isFavorite, state.count],
  );

  return {
    isFavorite: state.isFavorite,
    count: state.count,
    displayLabel,
    iconGlyph,
    a11yLabel,
    pulseStyle,
    toggle,
    reset,
  };
}
