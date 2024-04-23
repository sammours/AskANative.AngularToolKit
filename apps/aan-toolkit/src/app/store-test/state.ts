import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import {
  BaseReducerState,
  ReducerState,
} from '@askanative-angulartoolkit/shared/store';

import { Movie } from './models/movie.model';
import { movieReducer } from './reducers/movie.reducer';

export interface AppState {
  movie: ReducerState<Movie>;
}

export const reducers = {
  movie: movieReducer,
};

export function debug(
  reducer: ActionReducer<BaseReducerState>
): ActionReducer<BaseReducerState, Action> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];
export const runtimeChecks = {
  strictActionImmutability: true,
};
