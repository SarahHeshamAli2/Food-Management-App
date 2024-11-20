
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './modules/authentcation/components/Login/Login'
import Register from './modules/authentcation/components/Registration/Register'
import ResetPass from './modules/authentcation/components/ResetPass/ResetPass'
import CategoriesList from './modules/categories/components/CategoriesList/CategoriesList'
import CategoryData from './modules/categories/components/CategoryData/CategoryData'
import ReciepesList from './modules/reciepes/components/ReciepesList/ReciepesList'
import ReciepesData from './modules/reciepes/components/ReciepesData/ReciepesData'
import ForgetPass from './modules/authentcation/components/ForgetPass/ForgetPass'
import ChangePass from './modules/authentcation/components/ChangePass/ChangePass'
import UsersList from './modules/users/components/UsersList/UsersList'
import NotFound from './modules/shared/components/Notfound/NotFound'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'
import Dashboard from './modules/dashboard/components/Dashboard/Dashboard'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import VerifyRegister from './modules/VerifyRegister/VerifyRegister'
import { privateAxiosInstance, USERs_URLs } from './services/urls'
import axios from 'axios'

function App() { 
  const [loginData, setLoginData] = useState(null)


  const [profileImage, setProfileImage] = useState(localStorage.getItem('userProfileImage'))
 
  const getCurrentUser = async () =>{
   await axios.get(`https://upskilling-egypt.com:3006/api/v1/Users/currentUser
`,{
  headers : {
    Authorization : localStorage.getItem('token')
  }
}).then((res)=>{
      console.log(res.data);
      console.log(loginData);
    setProfileImage(res?.data?.imagePath)
      localStorage.setItem('userProfileImage',res.data.imagePath)
      // localStorage.setItem('test','test')
    }).catch((err)=>{console.log(err);
    })
  }



  let saveLoginData =  async () => {

    let decodedData = jwtDecode(localStorage.getItem('token'))
    setLoginData(decodedData)
    if(loginData) {
      localStorage.getItem('userProfileImage')
      getCurrentUser()
    }
  }

useEffect(()=>{

  if(localStorage.getItem('token')) {
    saveLoginData()
    localStorage.getItem('userProfileImage')

  }

},[loginData?.userEmail])


  const router = createBrowserRouter([

    {path : '' , element : <AuthLayout/> ,
      errorElement : <NotFound/>,
      children : [ 
        {path : 'login'  , element : <Login saveLoginData = {saveLoginData}/>},
        {index:true , element : <Login saveLoginData = {saveLoginData}/>},
        {path : 'register'  , element : <Register/>},
        {path : 'reset-password'  , element : <ResetPass/>},
        {path : 'Forget-password'  , element : <ForgetPass/>},
        {path : 'change-password'  , element : <ChangePass/>},
        {path : 'verify-register'  , element : <VerifyRegister/>},
      ]
    },



   {
    path : '' , element :  <ProtectedRoute ><MasterLayout setLoginData={setLoginData} loginData ={loginData} profileImage={profileImage}/> </ProtectedRoute>, 
    
    errorElement : <NotFound/>,
    children : [
      {path : 'dashboard', element: <Dashboard loginData ={loginData} /> },
       {path : 'categories-list'  , element : <CategoriesList/>},
      { path : 'categories-data'  , element : <CategoryData/>},
      { path : 'recipies-list'  , element : <ReciepesList/>},
      { path : 'recipie/:recipieId'  , element : <ReciepesData/>},
      { path : 'recipie/new-recipie'  , element : <ReciepesData/>},
       {path : 'reciepies-data'  , element : <ReciepesData/>},
      { path : 'users-list'  , element : <UsersList/>},
    ]
   },
   




  ])

  return  <>
  <ToastContainer 
  autoClose={3000}/>
  <RouterProvider router={router}/>
  </>

  

}

export default App
