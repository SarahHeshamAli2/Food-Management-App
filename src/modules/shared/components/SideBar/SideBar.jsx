import { useContext, useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import logo from '../../../../assets/images/3.svg'
import {  NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';


export default function SideBar() {

  const {  setLoginData,loginData
  } = useContext(AuthContext)
  const userRole = loginData?.roles[0]
  const navigate = useNavigate()
  useEffect(()=>{
    localStorage.getItem('sidebar') ?    setIsCollapsed(JSON.parse(localStorage.getItem('sidebar'))) : setIsCollapsed(false)

  },[])

  const [isCollapsed, setIsCollapsed] = useState(JSON.parse(localStorage.getItem('sidebar')) || false)

  let toggleCollapsing = ()=>{
    setIsCollapsed(!isCollapsed)
    isCollapsed ? localStorage.setItem('sidebar',false) : localStorage.setItem('sidebar',true)
  }




  const logOut = ()=>{
    localStorage.removeItem('userProfileImage')
    localStorage.removeItem('token')
    setLoginData(null)
    navigate('/login')
  }
return <>

<div className='side-bar-container fullScreenSlider'>
<Sidebar    collapsed={isCollapsed} >
  <Menu>
      <div className="logo my-5 mx-4">
      <MenuItem className='myLogo'  onClick={toggleCollapsing}  icon={<img src={logo} alt="chef logo"  />} > </MenuItem>
      <span className='sr-only'>{isCollapsed ? 'click to open side bar' : ' click to close side bar'} </span>
      </div> 
      <div className="my-5 fixed-icons">


     
    <MenuItem  icon = {<i className="fa-solid fa-house"></i>} component={<NavLink to='/dashboard'/>}> Home <span className='sr-only'>navigate to home</span> </MenuItem>

{
  userRole !='User' ?  <>    <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<NavLink to='/users-list'/>}> Users <span className='sr-only'>navigate to user list</span></MenuItem>
  <MenuItem icon={<i className="fa-solid fa-utensils"></i>} component={<NavLink to='/recipies-list'/>}> Recipes  <span className='sr-only'>navigate to recipies list</span></MenuItem>
  <MenuItem icon = {<i className="fa-solid fa-list"></i>} component={<NavLink to='/categories-list'/>}> Categories <span className='sr-only'>navigate to categories list</span></MenuItem> </> : <>
  <MenuItem icon={<i className="fa-solid fa-utensils"></i>} component={<NavLink to='/recipies-list'/>}> Recipes  <span className='sr-only'>navigate to recipies list</span></MenuItem>
  <MenuItem icon={<i className="fa-regular fa-heart"></i>} component={<NavLink to='/user-favorites'/>}> Favorites <span className='sr-only'>navigate to change password</span> </MenuItem>
  </>

 
  

}

<MenuItem icon={<i className="fa-solid fa-lock"></i>} component={<NavLink to='/change-password'/>}> Change Password <span className='sr-only'>navigate to change password</span> </MenuItem>


    <MenuItem onClick={logOut} icon={<i className="fa-solid fa-right-from-bracket"></i>}> Logout <span className='sr-only'>navigate to logout</span></MenuItem>
    </div>
  </Menu>
</Sidebar>;











</div>
<div className="mobile-side">
  <Sidebar    collapsed={isCollapsed} >
  <Menu>
      <div className="logo my-5 mx-4 ">
      <MenuItem className=''  onClick={toggleCollapsing}  icon={<img src={logo} alt="chef logo"  />} > </MenuItem>
      <span className='sr-only'>{isCollapsed ? 'click to open side bar' : ' click to close side bar'} </span>
      </div> 
      <div className="my-5 fixed-icons">


     
    <MenuItem onClick={()=>setIsCollapsed(true)}  icon = {<i className="fa-solid fa-house"></i>} component={<NavLink to='/dashboard'/>}> Home <span className='sr-only'>navigate to home</span> </MenuItem>

{
  userRole !='User' ?  <>    <MenuItem onClick={()=>setIsCollapsed(true)} icon={<i className="fa-solid fa-users"></i>} component={<NavLink to='/users-list'/>}> Users <span className='sr-only'>navigate to user list</span></MenuItem>
  <MenuItem onClick={()=>setIsCollapsed(true)} icon={<i className="fa-solid fa-utensils"></i>} component={<NavLink to='/recipies-list'/>}> Recipes  <span className='sr-only'>navigate to recipies list</span></MenuItem>
  <MenuItem onClick={()=>setIsCollapsed(true)} icon = {<i className="fa-solid fa-list"></i>} component={<NavLink to='/categories-list'/>}> Categories <span className='sr-only'>navigate to categories list</span></MenuItem> </> : <>
  <MenuItem onClick={()=>setIsCollapsed(true)} icon={<i className="fa-solid fa-utensils"></i>} component={<NavLink to='/recipies-list'/>}> Recipes  <span className='sr-only'>navigate to recipies list</span></MenuItem>
  <MenuItem icon={<i className="fa-regular fa-heart"></i>} component={<NavLink to='/user-favorites'/>}> Favorites <span className='sr-only'>navigate to change password</span> </MenuItem>
  </>

 
  

}

<MenuItem onClick={()=>setIsCollapsed(true)} icon={<i className="fa-solid fa-lock"></i>} component={<NavLink to='/change-password'/>}> Change Password <span className='sr-only'>navigate to change password</span> </MenuItem>


    <MenuItem  onClick={logOut} icon={<i className="fa-solid fa-right-from-bracket"></i>}> Logout <span className='sr-only'>navigate to logout</span></MenuItem>
    </div>
  </Menu>
</Sidebar>
</div>

</>
}
