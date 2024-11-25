import { useState } from 'react'
import { privateAxiosInstance, RECIPIE_URLs } from '../../services/urls'
import useFetch from './useFetch'
import { useSearchParams } from 'react-router-dom'

export default function useRecipes() {
  let [currPage , setCurrPage] = useState(0)
  const [catValue,setCatValue]=useSearchParams()
  const categoryValue = catValue.get('category')
  
  const tagValue = catValue.get('tag')
  
    const getAllRecipes = async (pageNumber , pageSize , name , categoryVal,tagVal  )=> {

       const response =await privateAxiosInstance.get(RECIPIE_URLs.GET_RECIPIES,{
          params : {pageNumber :pageNumber , pageSize :pageSize , name : name , tagId : tagVal || tagVal == ''?tagVal :tagValue, categoryId:categoryVal || categoryVal == ''? categoryVal   : categoryValue }
          
        })
        setData(response?.data?.data)
        console.log(response);

        setCurrPage(response?.data?.pageNumber)
        
        return response
        
      }




       const {data,error,isLoading,trigger,fetchFunction,setData}=useFetch(getAllRecipes)

       return {
        recipiesList:data,
        error,
        isLoading,
        trigger,
          getAllRecipes : async()=>await getAllRecipes(),
        fetchFunction,
        currPage,
        setCurrPage,setCatValue,catValue,categoryValue,tagValue
      
       }
    




}
