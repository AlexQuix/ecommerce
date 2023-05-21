import { createContext, useState } from 'react';

export interface ILoaderState<T> {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: any;
  setError: React.Dispatch<React.SetStateAction<any>>;
  result: T;
  setResult: React.Dispatch<React.SetStateAction<T>>;
}

export interface ILoaderProviderProps<T> {
  children: JSX.Element | React.ReactNode
}


export const LoaderContext = createContext({} as ILoaderState<any>);

export function LoaderProvider<T>({ children }: ILoaderProviderProps<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [result, setResult] = useState<T>();
  
  return (
    <LoaderContext.Provider value={{ 
      loading, setLoading,
      error, setError,
      result, setResult
     } as ILoaderState<T>}>
      {children}
    </LoaderContext.Provider>
  );
}