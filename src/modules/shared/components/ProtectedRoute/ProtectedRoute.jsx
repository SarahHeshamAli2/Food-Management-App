import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children,loginData}) {

    

    if(localStorage.getItem('token') || loginData) {
        return children
    }


    else {
        return <Navigate to='/login' />

    } 

}
