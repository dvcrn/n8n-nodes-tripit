function orderObjectByKeys<T extends object>(
  obj: T,
  orderArray: readonly string[]
): T {
  return orderArray.reduce<T>((ordered, key) => {
    if (key in obj) {
      ordered[key as keyof T] = obj[key as keyof T];
    }
    return ordered;
  }, {} as T);
}

export default orderObjectByKeys;
