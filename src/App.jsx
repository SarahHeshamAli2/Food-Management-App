
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Offline } from "react-detect-offline";
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
import VerifyRegister from './modules/VerifyRegister/VerifyRegister'
import FavoriteList from './modules/FavoriteList/components/FavoriteList'
import {  useEffect } from 'react'
import UserProtectedRoute from './modules/shared/components/UserProtectedRoute/UserProtectedRoute'
import AdminProtectedRoute from './modules/shared/components/AdminProtectedRoute/AdminProtectedRoute'


function App() { 


 


useEffect(()=>{

},[])


  const router = createBrowserRouter([

    {path : '' , element : <AuthLayout/> ,
      errorElement : <NotFound/>,
      children : [ 
        {path : 'login'  , element : <Login/>},
        {index:true , element : <Login/>},
        {path : 'register'  , element : <Register/>},
        {path : 'reset-password'  , element : <ResetPass/>},
        {path : 'Forget-password'  , element : <ForgetPass/>},
        {path : 'change-password'  , element : <ChangePass/>},
        {path : 'verify-register'  , element : <VerifyRegister/>},
      ]
    },



   {
    path : '' , element :  <ProtectedRoute ><MasterLayout  /> </ProtectedRoute>, 
    
    errorElement : <NotFound/>,
    children : [
      {path : 'dashboard', element: <Dashboard  /> },
       {path : 'categories-list'  , element : <AdminProtectedRoute><CategoriesList/></AdminProtectedRoute>},
      { path : 'categories-data'  , element : <AdminProtectedRoute><CategoryData/></AdminProtectedRoute>},
      { path : 'recipies-list'  , element : <ReciepesList />},
      { path : 'recipie/:recipieId'  , element :<AdminProtectedRoute> <ReciepesData/></AdminProtectedRoute>},
      { path : 'recipie/new-recipie'  , element : <AdminProtectedRoute><ReciepesData/></AdminProtectedRoute>},
       {path : 'reciepies-data'  , element : <ReciepesData/>},
      { path : 'users-list'  , element : <AdminProtectedRoute><UsersList/></AdminProtectedRoute>},
      { path : 'user-favorites'  , element : <UserProtectedRoute><FavoriteList/></UserProtectedRoute>},
    ]
   },
   




  ])

  return  <>
  <ToastContainer 
  autoClose={3000}/>
    <Offline>

      <div className='offline text-center'>
      <i className="fa-solid fa-plug-circle-xmark fa-4x text-danger"></i>      
        <p className='fs-3'> you're now offline , please check your internet connection
        </p>
      </div>
    </Offline>

    <RouterProvider router={router}/>
  </>

  

}

export default App
