import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from '../../../../assets/images/3.svg'
import { Link } from 'react-router-dom';


export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  let toggleCollapsing = ()=>{
    setIsCollapsed(!isCollapsed)
  }

return <>

<div className='side-bar-container   '>
<Sidebar    collapsed={isCollapsed} >
  <Menu>
      <div className="logo my-5 mx-4">
      <MenuItem className='myLogo'  onClick={toggleCollapsing}  icon={<img src={logo} alt="chef logo"  />} > </MenuItem>

      </div>
      <div className="my-5">
    <MenuItem icon = {<i className="fa-solid fa-house"></i>} component={<Link to='/dashboard'/>}> Home </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to='/dashboard/users-list'/>}> Users </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-utensils"></i>} component={<Link to='/dashboard/recipies-list'/>}> Recipes </MenuItem>
    <MenuItem icon = {<i className="fa-solid fa-list"></i>} component={<Link to='/dashboard/categories-list'/>}> Categories </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-lock"></i>} component={<Link to='/changePassword'/>}> Change Password </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>}> Logout </MenuItem>
    </div>
  </Menu>
</Sidebar>;
</div>
</>
}
