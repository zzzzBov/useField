import { ActionTypes, ITouchAction } from '../types';

export const createTouchAction = (): ITouchAction => ({
  type: ActionTypes.TOUCH,
});
