import React from 'react'

export default function Header({title,desc,img , smallTitle}) {
  return <>
  
  <div className="header-container container py-5 my-3 position-relative">

    <div className="header-title row justify-content-between align-items-center text-white">
     <div className="caption col-md-6">
   <div className="d-flex align-items-center">
   <h1 className='fa-2x'>{title}</h1>
   <p className='mx-2  my-0 fs-2'>{smallTitle}</p>
   </div>
     <p>{desc}</p>
     </div>
     <div className="headerImg col-md-6 text-end position-absolute">
      <img src={img} alt="header-img" />
     </div>
    </div>
  </div>
  </>
}
