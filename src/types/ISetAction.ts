import { ActionTypes } from './ActionTypes'
import { IAction } from './IAction'

export interface ISetAction<Value> extends IAction<ActionTypes.SET, Value> { }
