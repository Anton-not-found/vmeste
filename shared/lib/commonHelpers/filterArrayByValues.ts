export function filterArrayByValues<T extends object>(
  searchString: string,
  dataArr: T[],
  keys: { key: keyof T; transformValue?: (value: any) => string }[],
): T[] {
  if (!searchString) {
    return dataArr;
  }

  const lowerSearchString = searchString.toLowerCase();

  return dataArr.filter((item) => {
    return keys.some((k) => {
      const value = k.transformValue
        ? k.transformValue(item[k.key as keyof T])
        : String(item[k.key as keyof T] as string | undefined);

      return (
        typeof value === "string" &&
        value.toLowerCase().includes(lowerSearchString)
      );
    });
  });
}
