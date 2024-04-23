import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Movie } from '../models/movie.model';
import { ReducerState } from '@askanative-angulartoolkit/shared/store';
import { AppState } from '../state';

const selectState = createFeatureSelector<AppState, ReducerState<Movie>>(
  'movie'
);

export const movieSelectors = {
  selectItems: createSelector(
    selectState,
    (state: ReducerState<Movie>): Movie[] => {
      if (!state.isNull) {
        return state.items;
      }

      return new Array<Movie>();
    }
  ),
  selectItem: createSelector(
    selectState,
    (state: ReducerState<Movie>, id: number): Movie => {
      if (!state.isNull) {
        return state.items.firstOrDefault((m) => m.id === id);
      }

      return new Movie();
    }
  ),
};
