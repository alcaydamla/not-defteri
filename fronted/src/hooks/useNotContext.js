import { NotContext } from "../contexts/NotContext";
import { useContext } from "react";

export const useNotContext= () => {
    const context = useContext(NotContext)

    if(!context){
        throw new Error('context yüklenmedi')
    }
    return context
    
}