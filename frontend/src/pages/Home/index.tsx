import Page from "./components/Page";
import Loader from "../../containers/Loader";
import useDataLoader from "../../hooks/user/useDataLoader";

export default function Home(){
    let userloader = useDataLoader();

    return (
        <Loader loader={userloader}>
            <Page />
        </Loader>
    )
}