import { ActionTypes, IResetAction } from '../types';

export const createResetAction = <Value>(
  initial: Value
): IResetAction<Value> => ({
  payload: initial,
  type: ActionTypes.RESET,
});
