import { useEffect, useState } from "react"

const useFetch = (fetchFunction) => {
  

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [counter, setCounter] = useState(0)


    const trigger = () => setCounter((prevCount)=>prevCount+1)

    useEffect(()=>{
(    async ()=> {
    setIsLoading(true)
    try {
        const response = await (fetchFunction && fetchFunction())
    setData(response)
    setIsLoading(false)
        
    } catch (error) {
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
        trigger

    }
}

export default useFetch