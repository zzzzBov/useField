import { ActionTypes } from './ActionTypes'
import { IAction } from './IAction'

export interface IResetAction<Value> extends IAction<ActionTypes.RESET, Value> { }
