import { useState } from "react";
import { CATEGORY_URLs, privateAxiosInstance } from "../../services/urls";
import useFetch from "./useFetch";
import axios from "axios";

export default function useCategories() {

  let [currPage , setCurrPage] = useState(0)
 
    
    let getCategories = async (pageNumber , pageSize )=>{ 
    const response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Category/`,{
          params : {pageSize :pageSize , pageNumber :pageNumber} , headers : {
            Authorization : localStorage.getItem('token')
          }
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
