import {
  useCallback,
  useReducer,
  Reducer
} from 'react'

import {
  createCleanAction,
  createResetAction,
  createSetAction,
  createTouchAction
} from './actions'

import {
  fieldReducer
} from './reducers'

import {
  Action,
  FieldValidation,
  IFieldData,
  IFieldState,
  IValidators
} from './types'

import {
  fromEntries
} from './utils'

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
