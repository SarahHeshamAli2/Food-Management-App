import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
export default function CategoryModal({catName,categoryFunction,show,close,modalHeader,formBtn}) {

 useEffect(()=>{
  setValue('name',catName)
 },[catName])

const [isEmptyCategory, setIsEmptyCategory]= useState(false)



    function categoryToggle(data) {
      categoryFunction(data)
      
    }    



    let{
        register,
        formState:{errors},
        handleSubmit,
        setValue,
        trigger,
        watch,
        getValues
      }=useForm({mode : 'onChange'})

      const onSubmit = (data)=> {
        categoryToggle(data)
        close()
        setValue('name','')
        
      }

 
      useEffect(()=>{
        isEmptyCategory ? trigger('name') : ''
      },[watch('name')])
  

return <>
<div className="categoryModal">
<Modal show={show} onHide={close}>
        <Modal.Header closeButton>
        <Modal.Title>{modalHeader}</Modal.Title>        </Modal.Header>
        <Modal.Body >
            <div className="modal-container  ">
            <form className='pt-4' onSubmit={handleSubmit(onSubmit)}>


<div className="input-group mt-5 ">
<input onInput={function(e) { !e.target.value  ? setIsEmptyCategory(true) : setIsEmptyCategory(false)}


} className="form-control input-bg " placeholder="Category Name" aria-label="name of category" aria-describedby="basic-addon1"
{...register('name',{
required : 'please enter category name'
})}
/>

</div>
{errors.name && <div className='text-danger mt-3'>{errors.name.message}</div>}


<div className="text-end my-4 border-top">
         
<Button type='submit' className='my-4 px-5'  variant="success" >
    {formBtn}
          </Button>
</div>
</form>
            </div>
        </Modal.Body>

      </Modal>
</div>
</>
}
