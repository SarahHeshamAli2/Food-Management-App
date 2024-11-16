import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout({loginData}) {

  
  return <>
    
    <div className='d-flex '>
        <div className='sideContain' >
          <SideBar/>
        </div>
        <div className='w-100 mx-3'>
            <Navbar loginData = {loginData}/>
            <Outlet/>
        </div>

    </div>
  
  </>
}
