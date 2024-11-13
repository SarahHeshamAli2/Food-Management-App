import React from 'react'

export default function Header({title,desc,img , smallTitle}) {
  return <>
  
  <div className="header-container p-4 my-3 ">

    <div className="header-title d-flex justify-content-between align-items-center text-white">
     <div className="caption">
   <div className="d-flex align-items-center">
   <h1 className='fa-4x'>{title}</h1>
   <p className='mx-2  my-0 fs-1'>{smallTitle}</p>
   </div>
     <p>{desc}</p>
     </div>
     <div className="sora">
      <img src={img} alt="header-img" />
     </div>
    </div>
  </div>
  </>
}
