import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from"../../../../assets/images/logo.png"

export default function AuthLayout() {
  return<>

  <div className='auth-container'>
    <div className="auth-overlay container-fluid">
        <div className="form-container row vh-100 justify-content-center align-items-center">
            <div className="col-md-5 bg-white rounded-2 px-5 py-4">
            <div className="logo text-center ">
                <img src={logo} alt="food-logo" className='w-75' />
            </div>
            <Outlet/>

            </div>
    

        </div>
    </div>
  </div>
  
  </>
}
