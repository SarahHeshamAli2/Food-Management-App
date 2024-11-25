import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext/AuthContext'

export default function AdminProtectedRoute({children}) {

  const {loginData}=  useContext(AuthContext)

    if(localStorage.getItem('token') && loginData?.roles[0]!='User') {
        return children
    }


    else {
        return <Navigate to='/dashboard' />

    } 

}