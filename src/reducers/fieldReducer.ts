import {
  Action,
  ActionTypes,
  IFieldState
} from '../types'

export const fieldReducer = <Value>(state: IFieldState<Value>, action: Action<Value>): IFieldState<Value> => {
  switch (action.type) {
    case ActionTypes.CLEAN:
      return {
        ...state,
        dirty: false
      }
    case ActionTypes.RESET:
      return {
        dirty: false,
        value: action.payload != null ? action.payload : state.value
      }
    case ActionTypes.SET:
      return {
        ...state,
        value: action.payload != null ? action.payload : state.value
      }
    case ActionTypes.TOUCH:
      return {
        ...state,
        dirty: true
      }
    default:
      return state
  }
}
