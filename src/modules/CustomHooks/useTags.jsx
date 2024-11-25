import { privateAxiosInstance, TAGS_URL } from '../../services/urls'
import useFetch from './useFetch'

export default function useTags() {

    const getAllTags = async ()=> {

       const response =await privateAxiosInstance.get(TAGS_URL.GET_TAGS)
        setData(response?.data )
        

        return response
        
      }
      



       const {data,error,setData}=useFetch(getAllTags)

       return {
        tagsList:data,
        error,
      
       }
    
    }