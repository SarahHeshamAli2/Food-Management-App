import { privateAxiosInstance, RECIPIE_URLs } from '../../services/urls'
import useFetch from './useFetch'

export default function useRecipes() {
    const getAllRecipes = async ()=> {
    
    
       const response =await privateAxiosInstance.get(RECIPIE_URLs.GET_RECIPIES,{
          params : {pageSize :10 , pageNumber :1}
        })
        return response
      }




       const {data,error,isLoading,trigger}=useFetch(getAllRecipes)

       return {
        recipiesList:data?.data?.data,
        error,
        isLoading,
        trigger
       }
    




}
