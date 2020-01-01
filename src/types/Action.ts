import { ICleanAction } from './ICleanAction';
import { IResetAction } from './IResetAction';
import { ISetAction } from './ISetAction';
import { ITouchAction } from './ITouchAction';

export type Action<Value> =
  | ICleanAction
  | IResetAction<Value>
  | ISetAction<Value>
  | ITouchAction;
