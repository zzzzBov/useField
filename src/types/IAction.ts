export interface IAction<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined
  > {
  error?: boolean
  meta?: Meta
  payload?: Payload
  type: Type
}
