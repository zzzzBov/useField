import {
  useCallback,
  useReducer,
  Reducer
} from 'react'

import {
  Action,
  ActionTypes,
  FieldValidation,
  ICleanAction,
  IFieldData,
  IFieldState,
  IResetAction,
  ISetAction,
  ITouchAction,
  IValidators
} from './types'

import {
  fromEntries
} from './utils'

const fieldReducer = <Value>(state: IFieldState<Value>, action: Action<Value>): IFieldState<Value> => {
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

const createCleanAction = (): ICleanAction => ({
  type: ActionTypes.CLEAN
})

const createResetAction = <Value>(initial: Value): IResetAction<Value> => ({
  payload: initial,
  type: ActionTypes.RESET
})

const createSetAction = <Value>(value: Value): ISetAction<Value> => ({
  payload: value,
  type: ActionTypes.SET
})

const createTouchAction = (): ITouchAction => ({
  type: ActionTypes.TOUCH
})

export const useField = <Value, Validators extends IValidators<Value>>(validators: Validators, initialValue: Value): IFieldData<Value, Validators> => {
  const [
    {
      dirty,
      value
    },
    dispatch
  ] = useReducer<Reducer<IFieldState<Value>, Action<Value>>>(fieldReducer, {
    dirty: false,
    value: initialValue
  })

  const clean = useCallback(() => {
    dispatch(createCleanAction())
  }, [])

  const reset = useCallback(() => {
    dispatch(createResetAction(initialValue))
  }, [initialValue])

  const set = useCallback((value: Value) => {
    dispatch(createSetAction(value))
  }, [])

  const touch = useCallback(() => {
    dispatch(createTouchAction())
  }, [])

  const validationEntries =
    Object
      .entries(validators)
      .map<[string, boolean]>(([key, validator]) => [key, validator(value)])

  const validation = fromEntries(validationEntries) as FieldValidation<Value, Validators>

  const valid = validationEntries.every(([_, valid]) => valid)

  const error = dirty && !valid

  return {
    clean,
    dirty,
    error,
    reset,
    set,
    touch,
    valid,
    validation,
    value
  }
}
