import {
  ActionTypes,
  ISetAction
} from '../types'

export const createSetAction = <Value>(value: Value): ISetAction<Value> => ({
  payload: value,
  type: ActionTypes.SET
})
