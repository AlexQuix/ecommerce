import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { LoaderContext } from '../context/loader';

export type LoaderHook<T> = {
  loading: boolean;
  error: any;
  result: T | null;
};

export type DataLoader = () => Promise<any>;

// A custom hook that loads data using a provided DataLoader function
export function useLoader<T>(dataLoader:DataLoader, exec:boolean): LoaderHook<T> {
  const dataLoaderRef =  useRef(dataLoader);
  let [ processing, setProcessing ] = useState(false);
  // Access the LoaderContext to retrieve or set loading, error, and result states
  let { loading, setLoading, error, setError, setResult, result } = useContext( LoaderContext );

  // Asynchronous function to handle the data loading process
  const handleLoader = useCallback(async ()=>{
    try {
      setProcessing(true);
      // Set the loading state to true while the data is being loaded
      setLoading(true);
      // Call the dataLoader function to load the data and set the result state to the returned data
      const res = await dataLoaderRef.current();
      setResult(res);
    } catch (err) {
      // If there's an error loading the data, set the error state to the error message
      setError(err);
    } finally {
      // Set the loading state to false when the data loading process is complete
      setLoading(false);
      setProcessing(false);
    }
  }, [ setError, setLoading, setResult, dataLoaderRef ]);

  // Effect hook to handle data loading when the 'exec' boolean prop changes
  useEffect(()=>{
    // If 'exec' is true, clear the error and result states and initiate the data loading process
    if(exec && !processing){
      handleLoader();
    }
  }, [ exec, processing, handleLoader ])

  return { 
		loading, 
		error,
    result
  };
}