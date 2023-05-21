import { DataLoader } from "./hooks/useLoader";
import { LoaderProvider } from "./context/loader";
import { ErrorLoader } from "./components/ErrorLoader";

import LoaderLogic, { ChildrenComponent, ErrorComponent, LoadingIndicator } from "./components/LoaderLogic";
import LoadingAnimation from "./components/LoadingAnimation";

interface Props<T> {
  loader: DataLoader;
  LoadingIndicator: LoadingIndicator;
  Error: ErrorComponent;
  children: JSX.Element | React.ReactNode | ChildrenComponent<T>;
}

function Loader<T>({ loader, children, Error, LoadingIndicator }: Props<T>) {
  return (
    <LoaderProvider>
      <LoaderLogic dataLoader={loader}
                  Error={Error}
                  LoadingIndicator={LoadingIndicator}>
        {children}
      </LoaderLogic>
    </LoaderProvider>
  )
}

Loader.defaultProps = {
  LoadingIndicator: <LoadingAnimation />,
  Error: ErrorLoader
}

export default Loader;