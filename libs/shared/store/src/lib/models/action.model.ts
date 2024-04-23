import { TypedAction } from '@ngrx/store/src/models';

export interface StoreAction<T> extends TypedAction<string> {
  payload?: T | T[];
}

export interface StoreActionSingle<T> extends TypedAction<string> {
  payload?: T;
}

export interface StoreActionMultiple<T> extends TypedAction<string> {
  payload?: T[];
}
