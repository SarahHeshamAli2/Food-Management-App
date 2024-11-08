
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

function App() {


  const router = createBrowserRouter([

    {path : '' , element : <AuthLayout/> ,
      errorElement : <NotFound/>,
      children : [ 
        {path : 'login'  , element : <Login/>},
        {index:true , element : <Login/>},
        {path : 'register'  , element : <Register/>},
        {path : 'resetpassword'  , element : <ResetPass/>},
        {path : 'Forgetpassword'  , element : <ForgetPass/>},
        {path : 'changePassword'  , element : <ChangePass/>},
      ]
    },



   {
    path : 'dashboard' , element : <MasterLayout/> , 
    
    errorElement : <NotFound/>,
    children : [
      {index : true , element: <Dashboard/> },
       {path : 'categoriesList'  , element : <CategoriesList/>},
      { path : 'categoriesData'  , element : <CategoryData/>},
      { path : 'RecipiesList'  , element : <ReciepesList/>},
       {path : 'ReciepiesData'  , element : <ReciepesData/>},
      { path : 'UsersList'  , element : <UsersList/>},
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
