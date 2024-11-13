import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosInstance, USERs_URLs } from '../../../../services/urls'

export default function ForgetPass() {
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  let{
    register,
    formState:{errors,isSubmitting},
    handleSubmit
  }=useForm()

  const onSubmit = (data)=> {
    axiosInstance.post(USERs_URLs.FORGET_PASSWORD,data).then((resp)=>{console.log(resp)
      toast.success('your request is done , please check your mail!')
      navigate('/reset-password',{state : {data}})

    }).catch((error)=>{
      toast.error(error.response.data.message)
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

    <div className="input-group mt-5 ">
  <span className="input-group-text " id="basic-addon1">
  <i className="fa-solid fa-mobile-screen-button"></i>
  </span>
  <input type="email" className="form-control input-bg" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1"
  {...register('email',{
    required : 'email cannot be empty',
    pattern : {
      value : /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message : 'please enter a valid'
    }
  })}
  />

</div>
{errors.email && <div className='text-danger mt-3'>{errors.email.message}</div>}



<button className='btn btn-success w-100 my-5' > {isSubmitting ? 'submit ...' : 'submit'} </button>
   </form>
  </div>
  </div>

  </>
}
