import { useState } from "react";
import { CATEGORY_URLs, privateAxiosInstance } from "../../services/urls";
import useFetch from "./useFetch";

export default function useCategories() {

  let [currPage , setCurrPage] = useState(0)
 
    
    let getCategories = async (pageNumber , pageSize )=>{ 
    const response = await privateAxiosInstance.get(CATEGORY_URLs.HANDLE_CATEGORIES,{
          params : {pageSize :pageSize , pageNumber :pageNumber}
        })
        setData(response?.data)
        
        setCurrPage(response?.data?.pageNumber)
        
        
        return response
      }
      
    
    const {data,error,isLoading, trigger,setData,fetchFunction} = useFetch(getCategories)
      return {
        categories : data,
        errors:error,
        isLoadingCategory : isLoading,
        trigger,
        fetchFunction,
        getCategories : async()=>await getCategories(),
        currPage
   
      
      }

}
