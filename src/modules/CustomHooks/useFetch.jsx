import { useContext, useEffect, useState } from "react"
import { PaginationContext } from "../../context/PaginationContext";

const useFetch = (fetchFunction) => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const {setNumberOFPages}=useContext(PaginationContext)





    const [counter, setCounter] = useState(0)

    const trigger = () => setCounter((prevCount)=>prevCount+1)


    
 const paginateFuntion = async(fetchFun)=> {
    await fetchFunction(fetchFun)

    
 } 
    useEffect(()=>{
(    async ()=> {
    setIsLoading(true)
    try {
        const response = await (fetchFunction && await fetchFunction(1,9))
   
        setData(response?.data)
        
        
    setIsLoading(false)
    
    setNumberOFPages(Array(response?.data?.totalNumberOfPages).fill().map((_,i)=>i+1))
        
    } 
    
    catch (error) {
        console.log(error);
        setError(error)
        setIsLoading(false)
    }
}) ()
    },[counter])


    return {

        error,
        isLoading,
        data,
        trigger,
        setData,
        fetchFunction,paginateFuntion,
        

    }
}

export default useFetch