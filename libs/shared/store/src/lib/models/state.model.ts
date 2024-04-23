import { StateType } from './state-type.enum';

export interface BaseReducerState {
  isNull: boolean;
  type: StateType;
  isLoading: boolean;
}

export interface ReducerState<T> extends BaseReducerState {
  items: T[];
  count: number;
  current?: string | number;
}

export interface ReducerStateSingle<T> extends BaseReducerState {
  item: T | undefined;
}
