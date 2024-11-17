import { CATEGORY_URLs, privateAxiosInstance } from "../../services/urls";
import useFetch from "./useFetch";

export default function useCategories() {
 
    
    let getCategories = async ()=>{ 
    const response = await privateAxiosInstance.get(CATEGORY_URLs.HANDLE_CATEGORIES,{
          params : {pageSize :10 , pageNumber :1}
        })
        
        return response
      }
      
    
    const {data,error,isLoading, trigger} = useFetch(getCategories)
      return {
        categories : data,
        errors:error,
        isLoadingCategory : isLoading,
        trigger
      
      }

}
