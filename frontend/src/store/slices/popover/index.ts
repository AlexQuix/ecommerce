export interface IRect{ 
    x: number; 
    y: number;
    height: number;
}

export interface PopoverActions{
    setPos: (payload:IRect)=>{ payload: IRect; type: string; };
    setShow: (payload:boolean)=>{ payload: boolean; type: string; }
    setData: (payload:any)=>{ payload: any; type: string; };
}