import { FieldValidation } from './FieldValidation'
import { IValidators } from './IValidators'

export interface IFieldData<Value, Validators extends IValidators<Value>> {
  clean(): void
  dirty: boolean
  error: boolean
  reset(): void
  set(value: Value): void
  touch(): void
  valid: boolean
  validation: FieldValidation<Value, Validators>
  value: Value
}
