import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './recipieData.module.css'
import { useForm } from 'react-hook-form'
import {  privateAxiosInstance, RECIPIE_URLs } from '../../../../services/urls'
import { useEffect, useState } from 'react'
import { TAGS_URL } from './../../../../services/urls';
import useCategories from './../../../CustomHooks/useCategories';
import { toast } from 'react-toastify'
export default function ReciepesData() {

  const {categories}=useCategories()
  
  
  
  const [tags, setTags] = useState(null)
  const [categoryName, setCatName] = useState(null)
  const [tagName, setTagName] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const  getAllTags =async ()=>{
    privateAxiosInstance.get(TAGS_URL.GET_TAGS).then((resp)=>{
      setTags(resp?.data)
      
    }).catch((err)=>{console.log(err);
    })
  }
  

 const navigate= useNavigate()
 const params = useParams()
 const recipieId = params.recipieId
  
  
  const isNewRecipie = params.recipieId == undefined
  const [imageFile, setImageFile] = useState();

  
  useEffect(()=>{

    const beforeUnloadHandler = (e) => {
      e.preventDefault()
    }
    
    window.addEventListener('beforeunload',beforeUnloadHandler) 
    return ()=> window.removeEventListener('beforeunload',beforeUnloadHandler)
    })
    
  const discardProfileImage = ()=> {
    setValue('profileImage',null)
    setImageFile(null)
  }

  const getRecipieById = ()=> {
    privateAxiosInstance.get(RECIPIE_URLs.GET_RECIPIE_BY_ID(recipieId)).then((resp)=>{
      
      setValue('name',resp?.data?.name)
      setValue('description',resp?.data?.description)
      setValue('price',resp?.data?.price)
      setValue('tagId',resp?.data?.tag?.id)
      setTagName(resp?.data?.tag?.name)
      
  
      setValue('categoriesIds',resp?.data?.category[0]?.id)
      setCatName(resp?.data?.category[0]?.name)
      
      
    }).catch((error)=>{console.log(error);
    })
  }

  const onSubmit = (data)=>{

    const formData = new FormData()
    formData.append('name',data.name)
    formData.append('tagId',data.tagId)
    formData.append('price',data.price)
    formData.append('categoriesIds',data.categoriesIds)
    formData.append('description',data.description)
    formData.append('recipeImage',data.recipeImage)
    
      setIsLoading(true)


      
     privateAxiosInstance[isNewRecipie ? 'post' : 'put'](isNewRecipie ? RECIPIE_URLs.ADD_RECIPIE : RECIPIE_URLs.UPDATE_RECIPIE(recipieId),formData).then((response)=>{
      toast.success(response?.data?.message || 'recpie created !')
      setIsLoading(false)
      navigate('/recipies-list')
      
    }).catch((error)=>{
      setIsLoading(false)
      console.log(error.response.data.additionalInfo.errors.tagId);
      toast.error(error?.response?.data?.error || 'something went wrong please try again')
    })
  }
  const uploadImage = (selectorFiles) => {
    if (selectorFiles) {
      setImageFile(selectorFiles[0]);
     setValue('recipeImage',selectorFiles[0])
    }
  };

  let{
    register,
    formState:{errors},
    handleSubmit,
    setValue
  }=useForm()

  useEffect(()=>{
     getAllTags().then(()=>{
      if(params.recipieId   ) {
        getRecipieById()
       
     }
     })



  },[])
  return <>
    
    <header className={`${styles.headerWrapper} headerWrapper d-flex align-items-center justify-content-between`}>

      <div className="leftSection">
        <h3>Fill the <span>Recipes</span> !</h3>
        <p className={styles.textWrapper}>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
      </div>

      <div className="rightSection">
        <Link to={'/recipies-list'} className={`${styles.BtnLink} btnLink`}>
        All Recipes
        <svg className='ms-2' width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9927 7.70752C17.9927 8.01676 17.8783 8.28271 17.6494 8.50537L11.5542 14.5913C11.4367 14.7088 11.313 14.7954 11.1831 14.8511C11.0532 14.9067 10.9202 14.9346 10.7842 14.9346C10.4749 14.9346 10.2214 14.8356 10.0234 14.6377C9.82552 14.446 9.72656 14.2048 9.72656 13.9141C9.72656 13.7656 9.75749 13.6265 9.81934 13.4966C9.875 13.3667 9.95231 13.2523 10.0513 13.1533L12.1294 11.0566L15.5156 7.94873L15.8867 8.58887L12.6118 8.78369H1.46045C1.13883 8.78369 0.879069 8.68473 0.681152 8.48682C0.477051 8.2889 0.375 8.02913 0.375 7.70752C0.375 7.39209 0.477051 7.13542 0.681152 6.9375C0.879069 6.73958 1.13883 6.64063 1.46045 6.64063L12.6118 6.64062L15.8867 6.83545L15.5156 7.46631L12.1294 4.36768L10.0513 2.271C9.95231 2.17204 9.875 2.05762 9.81934 1.92773C9.75749 1.79785 9.72656 1.65869 9.72656 1.51025C9.72656 1.21956 9.82552 0.978353 10.0234 0.786621C10.2214 0.588704 10.4749 0.489746 10.7842 0.489746C11.0625 0.489746 11.3161 0.601074 11.5449 0.82373L17.6494 6.91895C17.8783 7.13542 17.9927 7.39827 17.9927 7.70752Z" fill="white"/>
</svg>

        </Link>
      </div>
    </header>

    <form  onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
       <div>
        <input placeholder='Recipe name' type="text" className={`${styles.inputStyle} form-control`}
        
        {...register('name',{required:'please enter a recpie name'})}
        />
        <div>
        {errors.name && <span className='text-danger'>{errors.name.message}</span>}

        </div>
      </div>
      <div>
        <select key={recipieId} placeholder='Recipe name' type="text" className={`${styles.inputStyle} form-control`}
        {...register('tagId',{required:'please enter tag'})}
        >

                 
<option >{tagName ? tagName : 'choose tag'}</option>


            {tags?.map(({id,name})=>  
                        <>

<option key={id} value={id}>
{name}


</option>
                        </>)}
       </select>
        <div>
        {errors.tagId && <span className='text-danger'>{errors.tagId.message}</span>}

        </div>
      </div>

      <div className='position-relative'>
        <input placeholder='Price' type="number" className={`${styles.inputStyle} form-control`}
        
        {...register('price',{required:'please enter price'  ,  min: {
          value: 1,
          message: "please enter a valid price"
      }, max: {
        value: 10000,
        message: "please enter a valid price"
    }} ) }
        />
        <span className={`${styles.price} position-absolute `}>EGP</span>
        <div>
        {errors.price && <span className='text-danger'>{errors.price.message}</span>}

        </div>
      </div>

      <div>
        <select  placeholder='Recipe name' type="text" className={`${styles.inputStyle} form-control`} 
        {...register('categoriesIds',{required : 'please enter category name'})}
        >
                      <option >{categoryName ? categoryName : ' choose category'}</option>

          {categories?.data?.map((category)=>
          <>
          <  option key={category.id} value={category?.id}>
           {category?.name}
        
          </option>
          </>)}
           </select>
        <div>
        {errors.categoriesIds && <span className='text-danger'>{errors.categoriesIds.message}</span>}

        </div>
      </div>
      <div>
        <textarea placeholder='Description' type="text" className={`${styles.inputStyle} form-control`}
        
        {...register('description',{required:'please enter description'})}
        />

        <div>
        {errors.description && <span className='text-danger'>{errors.description.message}</span>}

        </div>
      </div> 



{imageFile ? <>      {imageFile && (
  <div  className={`${styles.formImage}  position-relative`}>
    <img className='w-75' src={URL.createObjectURL(imageFile) }  

    />
    <button onClick={discardProfileImage} className={`${styles.discardBtn} btn`}
    
    >
    <i className="fa-solid fa-xmark "></i>
    <span className='sr-only'>{imageFile ? 'discard upload profile image' : 'upload profile image'}</span>

    </button>
  </div>
)} </> : <div className={`${styles.imageUpload} text-center`}>
        
  
<label htmlFor="file-upload" className={`${styles.customFileUpload}`}>
  
<div className="icon">
<svg width="37" height="19" viewBox="0 0 37 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.1472 11.6199C1.78241 11.6199 2.29734 11.9113 2.29734 12.2707V15.5249C2.29734 16.2437 3.3272 16.8265 4.59761 16.8265H32.2008C33.4712 16.8265 34.5011 16.2437 34.5011 15.5249V12.2707C34.5011 11.9113 35.016 11.6199 35.6512 11.6199C36.2864 11.6199 36.8014 11.9113 36.8014 12.2707V15.5249C36.8014 16.9626 34.7416 18.1282 32.2008 18.1282H4.59761C2.0568 18.1282 -0.00292969 16.9626 -0.00292969 15.5249V12.2707C-0.00292969 11.9113 0.512003 11.6199 1.1472 11.6199Z" fill="#4F4F4F"/>
<path d="M17.5859 0.225779C18.0351 -0.0283847 18.7633 -0.0283847 19.2125 0.225779L26.1133 4.13074C26.5624 4.3849 26.5624 4.79698 26.1133 5.05115C25.6641 5.30531 24.9359 5.30531 24.4868 5.05115L19.5494 2.25722V13.7025C19.5494 14.062 19.0344 14.3533 18.3992 14.3533C17.764 14.3533 17.2491 14.062 17.2491 13.7025V2.25722L12.3117 5.05115C11.8625 5.30531 11.1343 5.30531 10.6851 5.05115C10.236 4.79698 10.236 4.3849 10.6851 4.13074L17.5859 0.225779Z" fill="#4F4F4F"/>
</svg>

</div>
  Drag & Drop or <span> Choose a Item Image</span> to Upload</label>
<input {...register('recipeImage')}  className={styles.fileUpload} id="file-upload" type="file"  onChange={(e)=>uploadImage(e.target.files)} />
</div> }





     
    <div className={styles.borderBottom}>

    </div>
      <div className="formBtns text-end">
        <Link to='/recipies-list' className={styles.cancelBtn}>Cancel</Link>
        <button disabled={isLoading} className={styles.saveBtn}>{isLoading ? <i className='fa fa-spin fa-spinner'></i> : 'Save'}</button>
      </div>
    </form>
  

    
  
  </>
}
