/* eslint-disable no-unused-vars */
declare interface PaginationParams {
  page: number;
  limit: number;
}

declare type Nullable<T> = T | null;
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>;
