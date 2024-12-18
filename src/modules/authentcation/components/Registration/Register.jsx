
import { useEffect, useState } from 'react'
import styles from './register.module.css'
import { Link, useNavigate } from 'react-router-dom';
import {  useForm } from 'react-hook-form';
import { axiosInstance, USERs_URLs } from '../../../../services/urls';
import { toast } from 'react-toastify';
export default function Register() {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isVisible, setVisible] = useState(false);
  const [isRePasswordShown, setIsRePasswordShown] = useState(false)
  const [isRePasswordVisibile, setIsRePasswordVisibile] = useState(false);
  const [imageFile, setImageFile] = useState();

  useEffect(()=>{

    const beforeUnloadHandler = (e) => {
      e.preventDefault()
    }
    
    window.addEventListener('beforeunload',beforeUnloadHandler) 
    return ()=> window.removeEventListener('beforeunload',beforeUnloadHandler)
    })
    
  const uploadImage = (selectorFiles) => {
    if (selectorFiles) {
      setImageFile(selectorFiles[0]);
     setValue('profileImage',selectorFiles[0])
    }
  };
const navigate =useNavigate()

  const [isLoading, setIsLoading] = useState(false)

    

  const discardProfileImage = ()=> {
    setValue('profileImage',null)
    setImageFile(null)
  }


  let{
    register,
    formState:{errors},
    watch,
    handleSubmit,
    trigger,
    setValue
  
    
  
  }=useForm({ mode:'onChange'})


    const onSubmit = (data)=> {

      
    const formData = new FormData()
    formData.append('userName',data.userName)
    formData.append('country',data.country)
    formData.append('phoneNumber',data.phoneNumber)
    formData.append('password',data.password)
    formData.append('confirmPassword',data.confirmPassword)
    formData.append('email',data.email)
    formData.append('profileImage',data?.profileImage)
    
      setIsLoading(true)
      axiosInstance.post(USERs_URLs.REGISTER_USER,formData).then((response)=>{
        setIsLoading(false)
        toast.success(response?.data?.message)
        navigate('/verify-register',{state:data.email})

      }).catch((err)=>{console.log(err);
        toast.error(err?.response?.data?.message || 'something went wrong ! please try again')
        setIsLoading(false)
      })  
    
    
    
    
    }
  const toggleHideShowPassword = () => {
    setVisible(!isVisible);
    
    setIsPasswordShown(!isPasswordShown)
    
  };

  const toggleHideShowRepassword = ()=> {
    setIsRePasswordVisibile(!isRePasswordVisibile);
    setIsRePasswordShown(!isRePasswordShown)

  }

  useEffect(()=>{
    if(watch('confirmPassword')) {
      trigger('confirmPassword')

    }
  },[watch('password')])
  return <>

  <div className={`${styles.formWrapper} formWrp`} >
  <div className={styles.formCaption} >
  <h3>Register</h3>
  <p className={styles.captionText}>Welcome Back! Please enter your details</p>
  </div>
  <form onSubmit={handleSubmit(onSubmit)}>

<div className={styles.registerForm+"  registerForm" }>

 <div className={`left mx-2 w-100 row`}>
  <div className="col-md-6">
        
<div className={`${styles.inputGroup} input-group`}>
<span className="input-group-text border-0" id="basic-addon1">
<i className="fa-solid fa-mobile-screen-button"></i>
</span>
<input type="text" className="form-control input-bg" placeholder="UserName" aria-label="username" aria-describedby="basic-addon1"
{...register ('userName' , {required :'name cannot be empty' , pattern : {
  value : /^\S+\d$/,

  message : 'The user name must end with numbers without spaces'
} ,  maxLength : {
  value : 8,
  message : 'maximum 8 characters'
}} ) }
/>

</div>
<div className={styles.errorMessage} >
{errors.userName && <span className='text-danger'>{errors.userName.message}</span>}

</div>
  </div>

  <div className="col-md-6">
  <div className={`${styles.inputGroup} input-group`}>
<span className="input-group-text border-0" id="basic-addon1">
<i className="fa-solid fa-mobile-screen-button"></i>
</span>
<input type="email" className="form-control input-bg" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1"
  {...register('email',{
    required : 'email cannot be empty',
    pattern : {
      value : /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message : 'please enter a valid email'
    }
  })}
/>

</div>
<div className={styles.errorMessage}>
{errors.email && <span className='text-danger'>{errors.email.message}</span>}

</div>
  </div>
<div className="col-md-6">
<div className={`${styles.inputGroup} input-group`}>
<span className="input-group-text border-0 " id="basic-addon1">
<i className="fa-solid fa-lock"></i> 
</span>
<input type="text" className="form-control input-bg" placeholder="Country" aria-label="country" aria-describedby="basic-addon1"
{...register('country' , {required : "please enter a country name"})}
/>

</div>
<div className={styles.errorMessage}>
{errors.country && <span className='text-danger'>{errors.country.message}</span>}

</div>
</div>

<div className="col-md-6">
<div className={`${styles.inputGroup} input-group`}>
<span className="input-group-text border-0" id="basic-addon1">
<i className="fa-solid fa-mobile-screen-button"></i>
</span>
<input type="tel" className="form-control input-bg" placeholder="Phone Number" aria-label="phone number" aria-describedby="basic-addon1"
{...register('phoneNumber' , {required : 'please enter your phone number' , pattern : {
  value:/^01[0125][0-9]{8}$/,
  message : 'please enter valid egyptian number'
}})}
/>

</div>
<div className={styles.errorMessage}>
{errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}

</div>
</div>




<div className="col-md-6">
<div className={`${styles.inputGroup} input-group position-relative`}>
<span className="input-group-text  border-0" id="basic-addon1">
<i className="fa-solid fa-lock"></i> 
 </span>
<input id='password' type={!isVisible ? "password" : "text"} className="form-control input-bg" placeholder="password" aria-label="password" aria-describedby="basic-addon1"
 {...register('password' , {
  required : 'password cannot be empty',
  pattern : { value : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    message : "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."


  }
 })}
/>
<button onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button' onClick={toggleHideShowPassword} className='icon-btn'>
<i  aria-label="password-toggle"   className={isPasswordShown ?"fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle confirm" : "fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"}></i>
<span className='sr-only'>{isPasswordShown ? 'hide  password' : 'show  password'}</span>

</button></div>
<div className={styles.errorMessage}>
{errors.password && <span className='text-danger'>{errors.password.message}</span>}

</div>
</div>

<div className="col-md-6">
<div className={`${styles.inputGroup} input-group position-relative`}>
  <span className="input-group-text border-0 " id="basic-addon1">
  <i className="fa-solid fa-lock"></i> 
   </span>
 <input   type={!isRePasswordVisibile ? "password" : "text"} className="form-control input-bg " placeholder="Confirm-Password" aria-label="password" aria-describedby="basic-addon1"
 {...register('confirmPassword' , {
  required : 'confirm password cannot be empty',
       validate: (value) => value === watch("password") || 'passwords not matches'
       
       
 })} />
 <button onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button' className='icon-btn'  onClick={toggleHideShowRepassword}>
 <i aria-label="confirm-password-toggle" className={isRePasswordShown ?"fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle confirm" : "fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"}></i>
 <span className='sr-only' >{isRePasswordShown ? 'hide confirm password' : 'show confirm password'}</span>

 </button>
</div>
<div className={styles.errorMessage}>
{errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}

</div> 
</div>

</div> 
<div className={styles.rightInputs +" right w-100"}>







  <div className="d-flex align-items-center ">


    {imageFile ? <>{imageFile && (
  <div  className={`${styles.formImage}  position-relative`}>
    <img className='w-75' alt='user profile' src={URL.createObjectURL(imageFile) }  

    />
    <button className={`${styles.discardBtn} btn`}
    
    onClick={discardProfileImage}>
    <i className="fa-solid fa-xmark "></i>
    <span className='sr-only'>{imageFile ? 'discard upload profile image' : 'upload profile image'}</span>

    </button>
  </div>
)}</> :  <div className="profileImageField mx-2">
<label htmlFor="file-upload" className={`${styles.customFileUpload}`}>
<div className={styles.cameraIcon}>
<i className="fa-solid fa-camera fa-2x"></i>

</div>

 <p className={styles.photoText}>Add profile picture</p>


               </label>
     <input  
   
     {...register('profileImage')}
     className={styles.fileUpload} id="file-upload" type="file" onChange={(e) => uploadImage(e.target.files)
     
   
   
   }
   
   
   />
</div>}




  </div>



</div>
</div>
<div className="text-end">
<Link to='/login' className={styles.loginBtn}>Login now?</Link>

</div>
<div className="text-center ">
<button disabled={isLoading} className={`${styles.registerBtn} btn mainBtnColor registerBtn`}>{isLoading ? <i className='fa fa-spin fa-spinner '></i> : "Register"}</button>

</div>
  </form>
  </div>
  </>
}
