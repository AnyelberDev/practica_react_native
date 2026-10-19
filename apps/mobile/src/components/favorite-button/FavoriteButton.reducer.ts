export interface IFavoriteState {
  isFavorite: boolean;
  count: number;
}

export type FavoriteAction =
  | { type: 'toggle'; maxCount: number }
  | { type: 'reset' };

/** Reducer puro: testeable sin React (Single Responsibility). */
export function favoriteReducer(state: IFavoriteState, action: FavoriteAction): IFavoriteState {
  switch (action.type) {
    case 'toggle': {
      const isFavorite = !state.isFavorite;
      const nextCount = state.count + (isFavorite ? 1 : -1);
      return {
        isFavorite,
        count: Math.min(Math.max(nextCount, 0), action.maxCount),
      };
    }
    case 'reset':
      return { isFavorite: false, count: 0 };
  }
}
