import { ChildrenProps } from "../../../../containers/Loader/components/LoaderLogic";
import CategoryService, { ICategory } from "../../../../services/category";

import Loader from "../../../../containers/Loader";
import Select from "../../../Forms/Select"
import Spinner from "../../../LoadingIndicator/Spinner";


type Props = {
    value: string;
    onChange: (option:string)=> void;
    name: string;
}

export default function SelectCategory({value, onChange, name}:Props){

    function reduceOption(category:ICategory[]):string[]{
        return category.reduce((acc, current)=>{
            acc.push(current.category_name);
            return acc;
        }, ["Todos"] as string[]);
    }

    async function retrieveData(){
        let res = await CategoryService.getAll();
        if(res.ok)
            return res.result;
        
        return null;
    }

    return (
        <>
            <label className="small text-dark-500 pb-1 border-bottom">Categories</label>
            <Loader loader={retrieveData}
                    LoadingIndicator={<Spinner style={{minHeight: "40px"}}/>}>
                {({result}:ChildrenProps<ICategory[] | null>)=>
                        result 
                        ? <Select value={value}
                                options={reduceOption(result)}
                                handleSelected={(option:string)=>{
                                    onChange(option);
                                }}/>
                        : <></>
                }
            </Loader>
        </>
    )
}