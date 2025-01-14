import  { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import { axiosInstance, USERs_URLs } from '../../../../services/urls';


export default function Login() {
    const {saveLoginData} = useContext(AuthContext)
  const location = useLocation()
  const myLocation = location.state
  const navigate = useNavigate()
  const [isVisible, setVisible] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const toggleHideShowPassword = () => {
    setVisible(!isVisible);
    
    setIsPasswordShown(!isPasswordShown)
    
  };
  let{
    register,
    formState:{errors,isSubmitting},
    handleSubmit
  }=useForm({defaultValues : {email : myLocation} , mode:'onChange'})

  const onSubmit = async(data)=> {
   await axiosInstance.post(USERs_URLs.USER_LOGIN,data).then((resp)=>{
      toast.success('welcome back !')
      navigate('/dashboard')
      localStorage.setItem('token',resp.data.token)
      
      saveLoginData()


    }).catch((error)=>{
      toast.error(error?.response?.data.message)
    })

  }



  return <>
  
  <div className='login-form'>
<div className="title my-3">
<h3 className='h5'>Login</h3>
<span className='text-sm text-muted'>Welcome Back! Please enter your details</span>
</div>
    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="input-group mb-3">
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

    <div className="input-group mb-3 position-relative">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-lock"></i> 
   </span>
 <input id='password' type={!isVisible ? "password" : "text"} className="form-control input-bg" placeholder="Password" aria-label="password" aria-describedby="basic-addon1"
 {...register('password' , {
  required : 'password cannot be empty'
 })}
 />
 <button onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button' onClick={toggleHideShowPassword} className='icon-btn'>
 <i  aria-label="password-toggle"   className={isPasswordShown ?"fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle confirm" : "fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"}></i>

 </button></div>
{errors.password && <span className='text-danger'>{errors.password.message}</span>}


<div className="links d-flex justify-content-between my-3">
 <Link className='text-decoration-none text-black' to='/register'>Register Now?</Link>
 <Link className='text-decoration-none text-success' to='/forget-password'>Forgot Password?</Link>
</div>

<button disabled={isSubmitting}  className='btn mainBtnColor text-white w-100'>{isSubmitting ? <i className='fa fa-spin fa-spinner'></i> : 'Login'}</button>
    </form>
  </div>
  
  </>
}
