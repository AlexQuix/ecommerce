import { useContext } from 'react';
import { LoaderContext, ILoaderState } from '../context/loader';

export function useRetrieveResult<T>(): T {
  const { result } = useContext(LoaderContext) as ILoaderState<T>;
  return result;
}