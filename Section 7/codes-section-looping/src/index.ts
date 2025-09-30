type Compute<A extends any> = A extends Function ? A : { [K in keyof A]: A[K] };
export type Expect<T extends true> = T;
export type Equal<X, Y> = (<T>() => T extends Compute<X> ? 1 : 2) extends <
  T
>() => T extends Compute<Y> ? 1 : 2
  ? true
  : false;
