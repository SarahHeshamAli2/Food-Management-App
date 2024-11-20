import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout({loginData,setLoginData,profileImage,isLoading}) {

  
  return <>
    
    <div className='d-flex '>
        <div className='sideContain' >
          <SideBar setLoginData={setLoginData}/>
        </div>
        <div className='w-100 mx-3'>
            <Navbar isLoading={isLoading} loginData = {loginData} profileImage={profileImage}/>
            <Outlet/>
        </div>

    </div>
  
  </>
}
