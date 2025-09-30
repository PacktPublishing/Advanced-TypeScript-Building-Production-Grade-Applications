type NonEmptyArray<T> = [T, ...T[]];

// Type Guard
export function isNonEmpty<A>(arr: A[]): arr is NonEmptyArray<A> {
  return arr.length > 0;
}

function myFunction(arr: string[]) {
  return arr;
}

const myArray = ["1"];

if (isNonEmpty(myArray)) {
  myFunction(myArray);
}
