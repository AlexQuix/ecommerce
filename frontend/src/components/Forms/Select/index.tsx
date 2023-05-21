import "./style.scss";
import SelectContainer, { IOption } from "../../../containers/Forms/Select"

type Props = {
    value: string;
    options: string[]
    handleSelected: (option:string)=>void;
}

export default function Select({value, options, handleSelected}: Props){
    function interHandleSelected(option: IOption){
        handleSelected(option.value);
    }

    return (
        <SelectContainer value={{
                        value,
                        title: value
                    }} 
                    options={options.map((v)=>({value:v, title:v}))} 
                    handleSelected={interHandleSelected}/>
    )
}