import { useEffect, useState } from 'react'
import Header from './../../../shared/components/Header/Header';
import boy from '../../../../assets/images/boy.svg'
import TableDetails from './../../../shared/components/TableDetails/TableDetails';
import DeleteConfirm from '../../../shared/components/DeleteConfirm/DeleteConfirm';
import LoadingScreen from '../../../shared/components/LoadingScreen/LoadingScreen';
import {  CATEGORY_URLs, privateAxiosInstance } from '../../../../services/urls';
import { toast } from 'react-toastify';

export default function CategoriesList() {
  const [categories, setCategories] = useState(null)
  const [categoryId, setCategoryId] = useState(0)


let getCategories = ()=>{ 
  privateAxiosInstance.get(CATEGORY_URLs.GET_CATEGORIES,{
    params : {pageSize :10 , pageNumber :1}
  }).then((response)=>{console.log(response);
      
    setCategories(response.data.data)
  }).catch((error)=>{console.log(error)
  })
}

let deleteSpecificCategory = () =>{
privateAxiosInstance.delete(CATEGORY_URLs.DELETE_CATEGORY(categoryId)).then((resp)=>{console.log(resp)
  toast.success('item deleted succussefully')

  getCategories()
  setShow(false)
}).catch((err)=>{console.log(err);
})
  
}


useEffect(()=>{
  getCategories()
},[])


const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
function handleShow(id) {
  setShow(true)
  setCategoryId(id)
  
}


  return <>

<Header img={boy} title ={'Categories'} smallTitle ={'item'} desc={'You can now add your items that any user can order it from the Application and you can edit'}/>

<TableDetails btnDetails={'Add New Category'} details={'You can check all details'} caption={'Categories Table Details'}/>

<DeleteConfirm DeletedItem={deleteSpecificCategory} show ={show} handleClose={handleClose} title={'Delete This Category ?'}/>
{
  categories ? <> <div className="table-container table-responsive">
  <table className="table table-striped">
    <thead >
      <tr className=''>
        <th scope="col">Name</th>
        <th scope="col">Creation Date</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
   {
    categories?.map((category)=>   <tr key={category.id} className='tableR'>
    <td>{category.name}</td>
    <td>{category.creationDate}</td>
   
    <td>
  <div className="cursorPointer">
  <i className="fa-solid fa-trash-can text-danger" onClick={()=>{handleShow(category.id)}}></i>
  <i className="fa-solid fa-pen-to-square mx-2 text-warning"></i>
  </div>
  
    </td>
  </tr>)
   }
  
  
    </tbody>
  </table>
  </div></> : <LoadingScreen/>
}

  </>
}
