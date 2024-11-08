import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ResetPass() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  let{
    register,
    formState:{errors},
    watch,
    handleSubmit
  }=useForm()

  const onSubmit = (data)=> {
    setLoading(true)
    
    axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset',data).then((resp)=>{console.log(resp)
      setLoading(false)
      toast.success('Password has been updated!')
      navigate('/login')

    }).catch((error)=>{
      console.log();
      toast.error(error.response.data.additionalInfo.errors ?error.response.data.additionalInfo.errors.password[0] : error.response.data.message)
      setLoading(false)
    })

  }

  const toggleShowPassword = (e)=> {
    const password = document.getElementById('password')
    const confirmPassword = document.getElementById('confirmPassword')
    

    password.type == 'password'  && !e.contains('confirm')? password.type = 'text' : password.type = 'password';
    confirmPassword.type == 'password' && e.contains('confirm')? confirmPassword.type = 'text' : confirmPassword.type = 'password';
    
    

  }


  return <>
  
  <div className='reset-password-form'>
<div className="title my-3">
<h3 className='h5'>Reset Password</h3>
<span className='text-sm text-muted'>Please Enter Your Otp or Check Your Inbox</span>
</div>
    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="input-group mb-1">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-mobile-screen-button"></i>
  </span>
  <input type="email" className="form-control input-bg" placeholder="Email" aria-label="email" aria-describedby="basic-addon1"
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

<div className="input-group mb-1">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-mobile-screen-button"></i>
  </span>
  <input type="text" className="form-control input-bg" placeholder="OTP" aria-label="otp" aria-describedby="basic-addon1"
  {...register('seed',{
    required : 'please enter otp'

  })}
  />

</div>
{errors.seed && <span className='text-danger'>{errors.seed.message}</span>}

    <div className="input-group mb-1 position-relative">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-lock"></i> 
   </span>
 <input id='password' type="password" className="form-control input-bg" placeholder="New password" aria-label="password" aria-describedby="basic-addon1"
 {...register('password' , {
  required : 'password cannot be empty'
 })}
 />
 <i onClick={(e)=>{toggleShowPassword(e.target.classList)}} className="fa-solid fa-eye position-absolute end-0 top-50 translate-middle "></i>
</div>
{errors.password && <span className='text-danger'>{errors.password.message}</span>}


<div className="input-group mb-1 position-relative">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-lock"></i> 
   </span>
 <input id='confirmPassword' type="password" className="form-control input-bg" placeholder="Confirm New Password" aria-label="password" aria-describedby="basic-addon1"
 {...register('confirmPassword' , {
  required : 'password cannot be empty',
       validate: (value) => value === watch("password") || "password and confirm password do not match !"
 })}
 />
 <i onClick={(e)=>{toggleShowPassword(e.target.classList)}} className="fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"></i>
</div>
{errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}



<button className='btn btn-success w-100'>{loading ? <i className='fa fa-spin fa-spinner'></i> : 'Rest Password'}</button>
    </form>
  </div>
  
  </>
}
