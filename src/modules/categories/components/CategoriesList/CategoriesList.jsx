import { useEffect, useState } from 'react'
import Header from './../../../shared/components/Header/Header';
import boy from '../../../../assets/images/boy.svg'
import TableDetails from './../../../shared/components/TableDetails/TableDetails';
import DeleteConfirm from '../../../shared/components/DeleteConfirm/DeleteConfirm';
import LoadingScreen from '../../../shared/components/LoadingScreen/LoadingScreen';
import {  CATEGORY_URLs, privateAxiosInstance } from '../../../../services/urls';
import { toast } from 'react-toastify';
import Nodata from '../../../shared/components/NoData/Nodata';

import EditToolsDropDown from '../../../shared/components/EditToolsDropDown/EditToolsDropDown';

export default function CategoriesList() {
  const [categories, setCategories] = useState(null)
  const [categoryId, setCategoryId] = useState(0)
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  

  

  function handleShowAddCategory() {
    setShowAddCategory(true)
    
    
  }
  function handleShowEditCategory(id,catName) {
    setShowEditCategory(true)
    setCategoryId(id)
    setCategoryName(catName)
        


    
  }


let getCategories = ()=>{ 
  privateAxiosInstance.get(CATEGORY_URLs.HANDLE_CATEGORIES,{
    params : {pageSize :10 , pageNumber :1}
  }).then((response)=>{console.log(response);
      
    setCategories(response.data.data)
  }).catch((error)=>{console.log(error)
  })
}

let editCategory = (data)=>{



  privateAxiosInstance.put(CATEGORY_URLs.ToGGLE_CATEGORY(categoryId),data).then((resp)=>{console.log(resp)
    toast.success('item edited succussefully')
    getCategories()
    setShow(false)
      
  }).catch((err)=>{
    toast.error(err?.response?.data?.message || 'something went wrong please try again')
    console.log(err);
    
  })
}

let deleteSpecificCategory = () =>{
  
privateAxiosInstance.delete(CATEGORY_URLs.ToGGLE_CATEGORY(categoryId)).then((resp)=>{console.log(resp)
  toast.success('item deleted succussefully')

  getCategories()
  setShow(false)
}).catch((err)=>{console.log(err);
  setShow(false)
  toast.error(err?.response?.data?.message || 'something went wrong please try again')
  
})
}


let addNewCategory = (data)=>{
  privateAxiosInstance.post(CATEGORY_URLs.HANDLE_CATEGORIES,data).then((response)=>{console.log(response);
      getCategories()
      toast.success('category added successfully')
  }).catch((error)=>{console.log(error)
    toast.error(error?.response?.data?.message || 'something went wrong please try again')
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
{
  categories ? <div className="categories-wrapper">

  <DeleteConfirm DeletedItem={deleteSpecificCategory} show ={show} handleClose={handleClose} title={'Delete This Category ?'}/>
  <TableDetails setShowAddCategory={setShowAddCategory} showAddCategory={showAddCategory} handleShowFunction={handleShowAddCategory}  categoryFunction={addNewCategory}  buttonInfo ={'save'} btnDetails={'Add New Category'} details={'You can check all details'} caption={'Categories Table Details'}/>
  
   <> <div className="table-container table-responsive">
  
    <table className="table table-striped">
      <thead >
        <tr className=''>
          <th onClick={()=>{editCategory()}} scope="col">Name</th>
          <th scope="col">Creation Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
     {
      categories?.map((category)=>   <tr key={category?.id} className='tableR'>
      <td>{category?.name}</td>
      <td>{category?.creationDate}</td>
     
      <td>
      <div className="cursorPointer">
    
    
  
  
    </div>
   <EditToolsDropDown catName={categoryName}  categoryName={category.name} categoryFunction={editCategory} setShowEditCategory={setShowEditCategory} handleShow={handleShow} showEditCategory={showEditCategory} handleShowFunction={handleShowEditCategory}   addNewCategoryFunction = {addNewCategory} buttonInfo ={'save'} btnDetails={'Add New Category'} details={'You can check all details'} caption={'Categories Table Details'} categoryId={category.id}/>
      </td>
    </tr>)
     }
    
    
      </tbody>
    </table>
    </div></> 
  
  
  </div> : <LoadingScreen/>

}


{
    categories?.length == 0 ? <Nodata/> : ''
  }
  </>
}
