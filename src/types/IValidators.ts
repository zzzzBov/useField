export interface IValidators<Value> {
  [validator: string]: (value: Value) => boolean
}
