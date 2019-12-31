import { IValidators } from './IValidators'

export type FieldValidation<Value, Validators extends IValidators<Value>> = {
  [V in keyof Validators]: boolean
}
