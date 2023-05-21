import { ErrorComponent } from "../LoaderLogic";

type Props = Parameters<ErrorComponent>[0];

export function ErrorLoader({ reason }: Props){
    return (
        <div>
            {reason.message}
        </div>
    )
}