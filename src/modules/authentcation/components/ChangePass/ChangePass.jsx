import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {  useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  privateAxiosInstance, USERs_URLs } from '../../../../services/urls';
import axios from 'axios';


export default function ChangePassword() {
 const location = useLocation()
const myLocation = location.state 

 
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isRePasswordShown, setIsRePasswordShown] = useState(false)
  const [isOldPasswordShow, setIsOldPasswordShown] = useState(false)
  const [isVisible, setVisible] = useState(false);
  const [isRePasswordVisibile, setIsRePasswordVisibile] = useState(false);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);




  let{
    register,
    formState:{errors},
    watch,
    handleSubmit,
    trigger
    
  
  }=useForm({defaultValues : {email : myLocation} , mode:'onChange'})

  const onSubmit = (data)=> {
    setLoading(true)
    
    axios.put(`https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword`,data , {
      headers : {
        Authorization : localStorage.getItem('token')
      }
    }).then((resp)=>{
      setLoading(false)
      toast.success('Password has been changed!')
      navigate('/dashboard')

    }).catch((error)=>{
      
      console.log(error);
      toast.error(error.response.data.additionalInfo.errors ?error.response.data.additionalInfo.errors.password[0] : error.response.data.message)
      setLoading(false)
    })

  }
  useEffect(()=>{
    if(watch('confirmPassword')) {
      trigger('confirmPassword')

    }
  },[watch('password')])

  const toggleHideShowPassword = () => {
    setVisible(!isVisible);
    
    setIsPasswordShown(!isPasswordShown)
    
  };

  const toggleHideShowRepassword = ()=> {
    setIsRePasswordVisibile(!isRePasswordVisibile);
    setIsRePasswordShown(!isRePasswordShown)

  }
  const toggleShowOldPassword = ()=> {
    setIsOldPasswordVisible(!isOldPasswordVisible);
    setIsOldPasswordShown(!isOldPasswordShow)

  }


  return <>
  
  
  <div className='reset-password-form'>
<div className="title my-3">
<h3 className='h5'>Change Your Password</h3>
<span className='text-sm text-muted'>Enter your details below</span>
</div>
    <form onSubmit={handleSubmit(onSubmit)}>







<div className="input-group mt-4 mb-1 position-relative">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-lock"></i> 
   </span>
 <input type={!isOldPasswordShow ? "password" : "text"}  className="form-control input-bg" placeholder="enter old password" aria-label="password" aria-describedby="basic-addon1"
 {...register('oldPassword' , {
  required : 'password cannot be empty',
  
 })}
 />
 <button onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button' onClick={toggleShowOldPassword} className='icon-btn'>
 <i  aria-label="password-toggle"   className={isPasswordShown ?"fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle confirm" : "fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"}></i>
 <span className='sr-only'>{isPasswordShown ? 'hide password' : 'show password'}</span>
 </button>
</div>
{errors.oldPassword && <span className='text-danger'>{errors.oldPassword.message}</span>}


    <div className="input-group mt-4 mb-1 position-relative">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-lock"></i> 
   </span>
 <input type={!isVisible ? "password" : "text"}  className="form-control input-bg" placeholder="New password" aria-label="password" aria-describedby="basic-addon1"
 {...register('newPassword' , {
  required : 'password cannot be empty',
  pattern : { value : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    message : "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."


  }
 })}
 />
 <button onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button' onClick={toggleHideShowPassword} className='icon-btn'>
 <i  aria-label="password-toggle"   className={isPasswordShown ?"fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle confirm" : "fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"}></i>
 <span className='sr-only'>{isPasswordShown ? 'hide password' : 'show password'}</span>
 </button>
</div>
{errors.newPassword && <span className='text-danger'>{errors.newPassword.message}</span>}


<div className="input-group mt-4 mb-1 position-relative">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-lock"></i> 
   </span>
 <input  type={!isRePasswordVisibile ? "password" : "text"} className="form-control input-bg" placeholder="Confirm New Password" aria-label="password" aria-describedby="basic-addon1"
 {...register('confirmNewPassword' , {
  required : 'password cannot be empty',
       validate: (value) => value === watch("newPassword") || 'passwords not matches'
       
       
 })}
 />
 <button onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button' className='icon-btn'  onClick={toggleHideShowRepassword}>
 <i aria-label="confirm-password-toggle" className={isRePasswordShown ?"fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle confirm" : "fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"}></i>
 <span className='sr-only'>{isPasswordShown ? 'hide password' : 'show password'}</span>

 </button>
</div>
{errors.confirmNewPassword && <span className='text-danger'>{errors.confirmNewPassword.message}</span>}



<button disabled={loading} className='btn mainBtnColor text-white w-100 mt-3'>{loading ? <i className='fa fa-spin fa-spinner'></i> : 'Rest Password'}</button>
    </form>
  </div>
  
  </>
}
