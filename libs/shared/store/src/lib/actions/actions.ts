import { ActionCreator, createAction, props, Action } from '@ngrx/store';
import { ActionTypes } from '../models/action-type.model';
import { TypedAction } from '@ngrx/store/src/models';
import { ErrorModel } from '@askanative-angulartoolkit/shared/common';

const getActionType = (prefix: string, type: ActionTypes) => {
  switch (type) {
    case ActionTypes.GetAll:
      return {
        loading: `[${prefix} Page] ${prefix} Get All Loading`,
        success: `[${prefix} Page] ${prefix} Get All Success`,
        failure: `[${prefix} Page] ${prefix} Get All Failure`,
      };

    case ActionTypes.Get:
      return {
        loading: `[${prefix} Page] ${prefix} Get Loading`,
        success: `[${prefix} Page] ${prefix} Get Success`,
        failure: `[${prefix} Page] ${prefix} Get Failure`,
      };

    case ActionTypes.Add:
      return {
        loading: `[${prefix} Page] ${prefix} Add Loading`,
        success: `[${prefix} Page] ${prefix} Add Success`,
        failure: `[${prefix} Page] ${prefix} Add Failure`,
      };

    case ActionTypes.Update:
      return {
        loading: `[${prefix} Page] ${prefix} Update Loading`,
        success: `[${prefix} Page] ${prefix} Update Success`,
        failure: `[${prefix} Page] ${prefix} Update Failure`,
      };

    case ActionTypes.Delete:
      return {
        loading: `[${prefix} Page] ${prefix} Delete Loading`,
        success: `[${prefix} Page] ${prefix} Delete Success`,
        failure: `[${prefix} Page] ${prefix} Delete Failure`,
      };
  }
};

export class ActionResult<T, TInput> {
  load: ActionCreator<
    string,
    (props: { payload: TInput }) => { payload?: TInput } & TypedAction<string>
  >;
  success: ActionCreator<
    string,
    (props: { payload: T | T[] }) => { payload: T | T[] } & TypedAction<string>
  >;
  failure: ActionCreator<
    string,
    (props: {
      payload: ErrorModel;
    }) => { payload: ErrorModel } & TypedAction<string>
  >;

  constructor(
    load:
      | ActionCreator<string, () => TypedAction<string>>
      | ActionCreator<
          string,
          (props: {
            payload: TInput;
          }) => { payload: TInput } & TypedAction<string>
        >,
    success: ActionCreator<
      string,
      (props: {
        payload: T | T[];
      }) => { payload: T | T[] } & TypedAction<string>
    >,
    failure: ActionCreator<
      string,
      (props: {
        payload: ErrorModel;
      }) => { payload: ErrorModel } & TypedAction<string>
    >
  ) {
    this.load = load;
    this.success = success;
    this.failure = failure;
  }
}

export class ActionGenerator<T> {
  public prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  create(type: ActionTypes): ActionResult<T, T> {
    const types = this.actionType(type);
    return new ActionResult<T, T>(
      createAction(types.loading),
      createAction(types.success, props<{ payload: T | T[] }>()),
      createAction(types.failure, props<{ payload: ErrorModel }>())
    );
  }

  createWithInput<TInput>(type: ActionTypes): ActionResult<T, TInput> {
    const types = this.actionType(type);
    return new ActionResult<T, TInput>(
      createAction(types.loading, props<{ payload: TInput }>()),
      createAction(types.success, props<{ payload: T | T[] }>()),
      createAction(types.failure, props<{ payload: ErrorModel }>())
    );
  }

  private actionType(type: ActionTypes) {
    return getActionType(this.prefix, type);
  }
}
