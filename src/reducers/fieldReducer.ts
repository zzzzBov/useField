import { Action, ActionTypes, IFieldState } from '../types';

export const fieldReducer = <Value>(
  state: IFieldState<Value>,
  action: Action<Value>
): IFieldState<Value> => {
  switch (action.type) {
    case ActionTypes.CLEAN:
      return state.dirty
        ? {
            ...state,
            dirty: false,
          }
        : state;
    case ActionTypes.RESET:
      return {
        dirty: false,
        value: action.payload != null ? action.payload : state.value,
      };
    case ActionTypes.SET:
      return state.value !== action.payload
        ? {
            ...state,
            value: action.payload != null ? action.payload : state.value,
          }
        : state;
    case ActionTypes.TOUCH:
      return !state.dirty
        ? {
            ...state,
            dirty: true,
          }
        : state;
    default:
      return state;
  }
};
