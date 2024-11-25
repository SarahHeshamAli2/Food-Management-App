
import  { createContext, useState } from 'react'

export const PaginationContext = createContext()



  
const nextBtn = (currPage , numberOfPages , fetchFunction , setNumberOfCurrentPage , e ) => {
      
    if(currPage < numberOfPages?.length) {
      fetchFunction(currPage+1,9,setNumberOfCurrentPage(e.target.innerText) )
    } 
    else {
return      
    }


  }

  const prevBtn =(fetchFunction , currPage , setNumberOfCurrentPage , e)=> {
  
      fetchFunction(currPage-1,5,setNumberOfCurrentPage(e.target.innerText) )


  }






export default function PaginationContextProvider({children}) {


    const [numberOfPages, setNumberOFPages] = useState(null)






















    
    return <PaginationContext.Provider value={{
        numberOfPages , setNumberOFPages , prevBtn , nextBtn
    }}>


    {children}
    
    </PaginationContext.Provider>

}
