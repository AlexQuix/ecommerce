export default function ErrorMessage({error}:{error:string|undefined}){
    if(error){
        return <span className="ms-3 mt-1 text-danger small">{error}</span>
    }

    return <></>
}