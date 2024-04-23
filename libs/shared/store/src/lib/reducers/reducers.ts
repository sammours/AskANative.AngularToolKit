import { StateType } from '../models/state-type.enum';
import { ReducerState, ReducerStateSingle } from '../models/state.model';
import { isArray, isSingle } from '@askanative-angulartoolkit/shared/common';

export const listReducer = {
  loading: <T>(state: ReducerState<T>) => ({
    ...state,
    type: StateType.Loading,
    isLoading: true,
  }),

  success: <T>(
    state: ReducerState<T>,
    payload: T | T[] | undefined,
    type: StateType,
    comparer: (item: T) => string = () => ''
  ) => {
    if (payload && isArray(payload)) {
      return {
        ...state,
        type,
        isNull: payload == null,
        count: payload.length,
        items: [...payload],
        isLoading: false,
      };
    } else if (payload && isSingle(payload)) {
      const items = createNewArrayWithUpdatedItem(
        payload,
        state.items,
        comparer
      );

      return {
        ...state,
        type,
        isNull: payload == null,
        items: items,
        count: items.length,
        isLoading: false,
        current: comparer(payload),
      };
    } else {
      return state;
    }
  },

  failure: <T>(state: ReducerState<T>) => ({
    ...state,
    type: StateType.Error,
    isLoading: false,
  }),

  initialState: <T>() =>
    ({
      type: StateType.Loading,
      isNull: true,
      count: 0,
      isLoading: false,
      items: new Array<T>(),
      current: '',
    } as ReducerState<T>),
};

export const singleReducer = {
  loading: <T>(state: ReducerStateSingle<T>) => ({
    ...state,
    type: StateType.Loading,
    isLoading: true,
  }),

  success: <T>(
    state: ReducerStateSingle<T>,
    payload: T | T[] | undefined,
    type: StateType
  ) => {
    if (payload && !isArray(payload)) {
      return {
        ...state,
        type,
        isNull: payload == null,
        item: payload,
        isLoading: false,
      };
    } else {
      return state;
    }
  },

  failure: <T>(state: ReducerStateSingle<T>) => ({
    ...state,
    type: StateType.Error,
    isLoading: false,
  }),

  initialState: <T>(): ReducerStateSingle<T> =>
    ({
      type: StateType.Loading,
      isNull: true,
      isLoading: false,
      item: undefined,
    } as ReducerStateSingle<T>),
};

export function createNewArrayWithUpdatedItem<T>(
  item: T,
  items: T[] | undefined,
  comparer: (item: T) => string = () => ''
) {
  if (!items) {
    return [item];
  }
  const newItems = [...items];
  const itemIndex = newItems.findIndex((x) => comparer(x) === comparer(item));
  if (itemIndex >= 0) {
    const existingItem = newItems.find((x) => comparer(x) === comparer(item));
    newItems[itemIndex] = { ...existingItem, ...item };
  } else {
    newItems.push(item);
  }
  return newItems;
}
