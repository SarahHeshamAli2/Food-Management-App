import React from 'react'
import avatar from '../../../../assets/images/avatar.png'
export default function Navbar({loginData}) {
  console.log(loginData);
 return <>
 <div className="profileInfo d-flex align-items-center justify-content-end  p-2 navbar rounded mt-3">
  <img src={avatar} alt="avatar" />
  <h6 className='mx-2'>{loginData?.userName}</h6>
 </div>
 
 </>
}
