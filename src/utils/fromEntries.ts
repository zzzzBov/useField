interface ObjectMap<T> {
  [key: string]: T;
}

export const fromEntries = <T>(data: [string, T][]) =>
  data.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {} as ObjectMap<T>);
