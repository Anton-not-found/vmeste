// Вспомогательный тип для извлечения только строковых ключей
type StringKeys<T> = Extract<keyof T, string>;
// Тип для вложенных ключей (только строковые ключи)
type NestedKeys<T> = {
  [K in StringKeys<T>]: T[K] extends object
    ? K | `${K}.${NestedKeys<T[K]>}`
    : K;
}[StringKeys<T>];

export function filterArrayByValues<T extends object>(
  searchString: string,
  dataArr: T[],
  keys: {
    key: NestedKeys<T>; 
    transformValue?: (value: any) => string;
  }[],
): T[] {
  if (!searchString) {
    return dataArr;
  }

  const lowerSearchString = searchString.toLowerCase();

  return dataArr.filter((item) => {
    return keys.some((k) => {
      const keyPath = k.key as string;
      const rawValue = keyPath.includes(".")
        ? getNestedValue(item, keyPath)
        : item[keyPath as keyof T];

      const value = k.transformValue
        ? k.transformValue(rawValue)
        : String(rawValue ?? "");

      return (
        typeof value === "string" &&
        value.toLowerCase().includes(lowerSearchString)
      );
    });
  });
}

function getNestedValue<T extends object>(obj: T, path: string): any {
  const keys = path.split(".");
  let current: any = obj;

  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}
