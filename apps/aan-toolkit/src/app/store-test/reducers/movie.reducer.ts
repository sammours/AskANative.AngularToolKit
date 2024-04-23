import { createReducer, on, State } from '@ngrx/store';
import { listReducer as reducers } from '@askanative-angulartoolkit/shared/store';

import {
  ReducerState,
  StoreAction,
  StateType,
} from '@askanative-angulartoolkit/shared/store';
import { Movie } from '../models/movie.model';
import { MovieActions } from '../actions/movie.actions';

const reducer = createReducer(
  reducers.initialState<Movie>(),
  on(MovieActions.getAll.load, (state: ReducerState<Movie>) =>
    reducers.loading(state)
  ),
  on(
    MovieActions.getAll.success,
    (state: ReducerState<Movie>, action: StoreAction<Movie>) => {
      return reducers.success(
        state,
        action.payload,
        StateType.Loaded,
        (p: Movie) => (p.id ? p.id + '' : '')
      );
    }
  ),
  on(MovieActions.getAll.failure, (state: ReducerState<Movie>) =>
    reducers.failure(state)
  ),

  on(MovieActions.getById.load, (state: ReducerState<Movie>) =>
    reducers.loading(state)
  ),
  on(
    MovieActions.getById.success,
    (state: ReducerState<Movie>, action: StoreAction<Movie>) => {
      return reducers.success(
        state,
        action.payload,
        StateType.Loaded,
        (p: Movie) => (p.id ? p.id + '' : '')
      );
    }
  ),
  on(MovieActions.getById.failure, (state: ReducerState<Movie>) =>
    reducers.failure(state)
  ),

  on(MovieActions.add.load, (state: ReducerState<Movie>) =>
    reducers.loading(state)
  ),
  on(
    MovieActions.add.success,
    (state: ReducerState<Movie>, action: StoreAction<Movie>) => {
      const payload = (action.payload as Movie) ?? new Movie();
      const items = [...state.items, action.payload];
      return {
        ...state,
        type: StateType.Added,
        isNull: items == null,
        items: items,
        count: items.length,
        isLoading: false,
        current: state.current,
      } as ReducerState<Movie>;
    }
  ),
  on(MovieActions.add.failure, (state: ReducerState<Movie>) =>
    reducers.failure(state)
  ),

  on(MovieActions.update.load, (state: ReducerState<Movie>) =>
    reducers.loading(state)
  ),
  on(
    MovieActions.update.success,
    (state: ReducerState<Movie>, action: StoreAction<Movie>) => {
      const payload = (action.payload as Movie) ?? new Movie();
      const items = [
        ...state.items.filter((x) => x.id !== payload.id),
        payload,
      ];
      return {
        ...state,
        type: StateType.Added,
        isNull: items == null,
        items: items,
        count: items.length,
        isLoading: false,
        current: state.current,
      } as ReducerState<Movie>;
    }
  ),
  on(MovieActions.update.failure, (state: ReducerState<Movie>) =>
    reducers.failure(state)
  ),

  on(MovieActions.delete.load, (state: ReducerState<Movie>) =>
    reducers.loading(state)
  ),
  on(
    MovieActions.delete.success,
    (state: ReducerState<Movie>, action: StoreAction<number>) => {
      const items = [
        ...state.items.filter((x) => x.id !== action.payload),
      ] as Movie[];
      return {
        ...state,
        type: StateType.Added,
        isNull: items == null,
        items: items,
        count: items.length,
        isLoading: false,
        current: state.current,
      } as ReducerState<Movie>;
    }
  ),
  on(MovieActions.delete.failure, (state: ReducerState<Movie>) =>
    reducers.failure(state)
  )
);

export function movieReducer(
  state: ReducerState<Movie> = reducers.initialState<Movie>(),
  action: StoreAction<Movie>
): ReducerState<Movie> {
  return reducer(state, action);
}
