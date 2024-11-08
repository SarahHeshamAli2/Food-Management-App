import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ForgetPass() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  let{
    register,
    formState:{errors},
    handleSubmit
  }=useForm()

  const onSubmit = (data)=> {
    setLoading(true)
    axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data).then((resp)=>{console.log(resp)
      setLoading(false)
      toast.success('your request is done , please check your mail!')
      navigate('/resetpassword')

    }).catch((error)=>{
      toast.error(error.response.data.message)
      setLoading(false)
    })

  }


  return <>
  
  <div>
  <div className='forget-password-form'>
<div className="title my-3">
<h3 className='h5'>Forgot Your Password?</h3>
<span className='text-sm text-muted'>No worries! Please enter your email and we will send a password reset link </span>
</div>
    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="input-group my-5">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-mobile-screen-button"></i>
  </span>
  <input type="email" className="form-control input-bg" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1"
  {...register('email',{
    required : 'email cannot be empty',
    pattern : {
      value : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message : 'please enter a valid'
    }
  })}
  />

</div>
{errors.email && <span className='text-danger'>{errors.email.message}</span>}





<button className='btn btn-success w-100 mb-3'>{loading ? <i className='fa fa-spin fa-spinner'></i> : 'Submit'}</button>
    </form>
  </div>
  </div>

  </>
}
