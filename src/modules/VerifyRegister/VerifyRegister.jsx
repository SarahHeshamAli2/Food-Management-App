import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { axiosInstance, USERs_URLs } from "../../services/urls"
import { toast } from "react-toastify"
import { useState } from "react"

export default function VerifyRegister() {
  const navigate =useNavigate()
  const location = useLocation()
  const myLocation = location.state 
  console.log(myLocation);
  
  const [isLoading, setIsLoading] = useState(false)
  const verifyUser = (data) => {
    setIsLoading(true)
      axiosInstance.put(USERs_URLs.VERIFY_USER,data).then((res)=>{
        console.log(res);
        setIsLoading(false)
        toast.success(res?.data?.message || 'account verified !')
        navigate('/login',{state : data.email})
        
      }).catch((err)=>{console.log(err);

        toast.error(err?.response?.data?.message || 'something went wrong please try again')
        setIsLoading(false)

      })
  }

  let{
    register,
    formState:{errors},
    handleSubmit,
    
  
  }=useForm({defaultValues : {email : myLocation} , mode:'onChange'})
  
  const onSubmitHandler = (data)=>{
    verifyUser(data)
console.log(data);

  }
  return <>
  
  <div className="verifyForm">
    <p>please check your email for verification code</p>
    <form onSubmit={handleSubmit(onSubmitHandler)}>

    <div className="input-group mb-3">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-mobile-screen-button"></i>
  </span>
  <input       disabled={myLocation}
 type="email" className="form-control " placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1"
  {...register('email')}
  />

</div>



<div className="input-group mt-4 mb-1">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-mobile-screen-button"></i>
  </span>
  <input  type="text" className="form-control " placeholder="OTP" {...register('code' , {required:"please enter code"}) }   aria-label="otp" aria-describedby="basic-addon1"
 {...register('code' , {required:"please enter verification code"}) }
  />

</div>


      {errors.code && <span className='text-danger'>{errors.code.message}</span>}
      <div className="text-center ">
      <button disabled={isLoading} className="btn mainBtnColor text-white w-50 mt-2">{isLoading ?<i className='fa fa-spin fa-spinner '></i>  :'Verify'}</button>

      </div>
    </form>
  </div>
 
 </>
}
