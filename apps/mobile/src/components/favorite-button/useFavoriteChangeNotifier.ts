import { useEffect, useRef } from 'react';

export interface IUseFavoriteChangeNotifierOptions {
  isFavorite: boolean;
  count: number;
  onFavoriteChange?: (isFavorite: boolean, count: number) => void;
}

const DEBOUNCE_MS = 300;

/**
 * Notifica de forma debounced los cambios de favorito al consumidor.
 * Una única responsabilidad + cleanup de timer (Single Responsibility).
 */
export function useFavoriteChangeNotifier({
  isFavorite,
  count,
  onFavoriteChange,
}: IUseFavoriteChangeNotifierOptions): void {
  const skipNotify = useRef(true);

  useEffect(() => {
    if (skipNotify.current) {
      skipNotify.current = false;
      return;
    }
    if (!onFavoriteChange) {
      return;
    }
    const timer = setTimeout(() => {
      onFavoriteChange(isFavorite, count);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [isFavorite, count, onFavoriteChange]);
}
