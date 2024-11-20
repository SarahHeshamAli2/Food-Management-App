import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {  useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance, USERs_URLs } from '../../../../services/urls';


export default function ResetPass() {
 const location = useLocation()
const myLocation = location.state 

 
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isRePasswordShown, setIsRePasswordShown] = useState(false)
  const [isVisible, setVisible] = useState(false);
  const [isRePasswordVisibile, setIsRePasswordVisibile] = useState(false);




  let{
    register,
    formState:{errors},
    watch,
    handleSubmit,
    trigger
    
  
  }=useForm({defaultValues : {email : myLocation} , mode:'onChange'})

  const onSubmit = (data)=> {
    setLoading(true)
    console.log(data);
    
    axiosInstance.post(USERs_URLs.RESET_PASSWORD,data).then((resp)=>{console.log(resp)
      setLoading(false)
      toast.success('Password has been updated!')
      navigate('/login')

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


  return <>
  
  
  <div className='reset-password-form'>
<div className="title my-3">
<h3 className='h5'>Reset Password</h3>
<span className='text-sm text-muted'>Please Enter Your Otp or Check Your Inbox</span>
</div>
    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="input-group mt-4 mb-1">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-mobile-screen-button"></i>
  </span>
  <input disabled type="email" className="form-control input-bg" placeholder="Email"  aria-label="email" aria-describedby="basic-addon1"
  {...register('email')}
  />

</div>
{errors.email && <span className='text-danger'>{errors.email.message}</span>}

<div className="input-group mt-4 mb-1">
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







    <div className="input-group mt-4 mb-1 position-relative">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-lock"></i> 
   </span>
 <input type={!isVisible ? "password" : "text"}  className="form-control input-bg" placeholder="New password" aria-label="password" aria-describedby="basic-addon1"
 {...register('password' , {
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
{errors.password && <span className='text-danger'>{errors.password.message}</span>}


<div className="input-group mt-4 mb-1 position-relative">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-lock"></i> 
   </span>
 <input  type={!isRePasswordVisibile ? "password" : "text"} className="form-control input-bg" placeholder="Confirm New Password" aria-label="password" aria-describedby="basic-addon1"
 {...register('confirmPassword' , {
  required : 'password cannot be empty',
       validate: (value) => value === watch("password") || 'passwords not matches'
       
       
 })}
 />
 <button onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button' className='icon-btn'  onClick={toggleHideShowRepassword}>
 <i aria-label="confirm-password-toggle" className={isRePasswordShown ?"fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle confirm" : "fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"}></i>
 <span className='sr-only'>{isPasswordShown ? 'hide password' : 'show password'}</span>

 </button>
</div>
{errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}



<button disabled={loading} className='btn mainBtnColor text-white w-100 mt-3'>{loading ? <i className='fa fa-spin fa-spinner'></i> : 'Rest Password'}</button>
    </form>
  </div>
  
  </>
}
