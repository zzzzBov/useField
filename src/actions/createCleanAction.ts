import { ActionTypes, ICleanAction } from '../types';

export const createCleanAction = (): ICleanAction => ({
  type: ActionTypes.CLEAN,
});
