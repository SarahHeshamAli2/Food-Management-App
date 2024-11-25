import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout() {

  
  return <>
    
    <div className='d-flex '>
        <div className='sideContain' >
          <SideBar />
        </div>
        <div className='w-100 mx-3'>
            <Navbar />
            <Outlet/>
        </div>

    </div>
  
  </>
}
