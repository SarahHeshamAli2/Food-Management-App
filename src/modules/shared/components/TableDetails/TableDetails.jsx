import React from 'react'

export default function TableDetails({caption,details,btnDetails}) {
return <>

<div className="details d-flex justify-content-between align-items-center">
    <div className="caption">
    <h4>{caption}</h4>
    <p>{details} </p>
    </div>
    <button className='btn btn-success px-5'>{btnDetails}</button>
</div>
</>
}
