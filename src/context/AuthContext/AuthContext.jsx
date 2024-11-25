import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import  { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()



  





export default function AuthContextProvider({children}) {


    

    const [loginData, setLoginData] = useState(null)
    const [profileImage, setProfileImage] = useState(localStorage.getItem('userProfileImage'))

    const getCurrentUser = async () =>{

       await axios.get(`https://upskilling-egypt.com:3006/api/v1/Users/currentUser
    `,{
      headers : {
        Authorization : localStorage.getItem('token')
      }
    }).then((res)=>{
        setProfileImage(res?.data?.imagePath)
          localStorage.setItem('userProfileImage',res.data.imagePath)

            
        }).catch((err)=>{console.log(err);
    
        })
      }










      let saveLoginData =   () => {

          
        
      const data =    JSON.stringify(          localStorage.getItem('token'))

      let decodedData = jwtDecode(data)



        setLoginData(decodedData)










        if(loginData) {
            getCurrentUser()
        }    
       
        

      }


      useEffect(()=>{

        if(localStorage.getItem('token')) {
          saveLoginData()
      
        }
        localStorage.getItem('userProfileImage')
      
      },[loginData?.userEmail])
      






    
    return <AuthContext.Provider value={{
       loginData  , profileImage,setLoginData , saveLoginData , 
    }}>


    {children}
    
    </AuthContext.Provider>

}
