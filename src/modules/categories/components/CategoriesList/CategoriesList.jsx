import {useContext, useState } from 'react'
import Header from './../../../shared/components/Header/Header';
import boy from '../../../../assets/images/boy.svg'
import TableDetails from './../../../shared/components/TableDetails/TableDetails';
import DeleteConfirm from '../../../shared/components/DeleteConfirm/DeleteConfirm';
import LoadingScreen from '../../../shared/components/LoadingScreen/LoadingScreen';
import {  CATEGORY_URLs, privateAxiosInstance } from '../../../../services/urls';
import { toast } from 'react-toastify';
import Nodata from '../../../shared/components/NoData/Nodata';

import EditToolsDropDown from '../../../shared/components/EditToolsDropDown/EditToolsDropDown';
import useCategories from '../../../CustomHooks/useCategories';
import { PaginationContext } from '../../../../context/PaginationContext';
import axios from 'axios';




export default function CategoriesList() {

  const {categories,trigger,fetchFunction,currPage} = useCategories()


  const [categoryId, setCategoryId] = useState(0)
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  
const{numberOfPages,prevBtn,nextBtn}=useContext(PaginationContext)
  



  function handleShowAddCategory() {
    setShowAddCategory(true)
    
    
  }
  function handleShowEditCategory(id,catName) {
    setShowEditCategory(true)
    setCategoryId(id)
    setCategoryName(catName)
        


    
  }

  const [numberOfCurrentPage,setNumberOfCurrentPage]= useState(0)


let editCategory = (data)=>{



  axios.put(`https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`    ,data, {
    headers:{
      Authorization:localStorage.getItem('token')
    }
  })
  
  
  
  .then((resp)=>{
    toast.success('item edited succussefully')
    trigger()
    setShow(false)
      
  }).catch((err)=>{
    toast.error(err?.response?.data?.message || 'something went wrong please try again')
    console.log(err);
    
  })
}

let deleteSpecificCategory = () =>{
  
privateAxiosInstance.delete(CATEGORY_URLs.ToGGLE_CATEGORY(categoryId)).then((resp)=>{
  toast.success('item deleted succussefully')
  trigger()
    setShow(false)
}).catch((err)=>{console.log(err);
  setShow(false)
  toast.error(err?.response?.data?.message || 'something went wrong please try again')
  
})
}


let addNewCategory = (data)=>{
  privateAxiosInstance.post(CATEGORY_URLs.HANDLE_CATEGORIES,data).then((response)=>{
    trigger()
      toast.success('category added successfully')
  }).catch((error)=>{console.log(error)
    toast.error(error?.response?.data?.message || 'something went wrong please try again')
  })
}




const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
function handleShow(id) {
  setShow(true)
  setCategoryId(id)
  
}


  
  return <>

<Header img={boy} title ={'Categories'} smallTitle ={'item'} desc={'You can now add your items that any user can order it from the Application and you can edit'}/>
{
  categories? <div className="categories-wrapper">

  <DeleteConfirm DeletedItem={deleteSpecificCategory} show ={show} handleClose={handleClose} title={'Delete This Category ?'}/>
  <TableDetails btn={true} setShowAddCategory={setShowAddCategory} showAddCategory={showAddCategory} handleShowFunction={handleShowAddCategory}  categoryFunction={addNewCategory}  buttonInfo ={'save'} btnDetails={'Add New Category'} details={'You can check all details'} caption={'Categories Table Details'}/>
  
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
      categories?.data?.map((category)=>   <tr key={category?.id} className='tableR'>
      <td>{category?.name}</td>


   
      <td>{category?.creationDate?.slice(0,10)}</td>
     
      <td>
      <div className="cursorPointer">
    
    
  
  
    </div>
   <EditToolsDropDown showA={false} catName={categoryName}  categoryName={category.name} categoryFunction={editCategory} setShowEditCategory={setShowEditCategory} handleShow={handleShow} showEditCategory={showEditCategory} handleShowFunction={handleShowEditCategory}   addNewCategoryFunction = {addNewCategory} buttonInfo ={'save'} btnDetails={'Add New Category'} details={'You can check all details'} caption={'Categories Table Details'} categoryId={category.id}/>
      </td>
    </tr>)
     }
    
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" onClick={(e)=>prevBtn(fetchFunction,currPage,setNumberOfCurrentPage,e)} aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    {numberOfPages?.map((numberOfPage)=>     
    <li  key={numberOfPage}  onClick={(e)=> fetchFunction(numberOfPage,9,setNumberOfCurrentPage(e.target.innerText) , localStorage.setItem('categoryCurrentPage' , numberOfPage)
    )}   className="page-item">
      
      <a  className={`page-link ${numberOfPage == numberOfCurrentPage || currPage == numberOfPage? "active"   :  ''}`} >{numberOfPage}  </a>
     
      </li>

   
)}

    <li className="page-item">
      <a  className="page-link"     onClick={(e)=>nextBtn(currPage,numberOfPages,fetchFunction,setNumberOfCurrentPage,e)}   aria-label="Next" >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    </div></> 
  
  
  </div> : <LoadingScreen/>

}


{
      categories?.data?.data?.length == 0 ? <Nodata/> : ''
  }
  </>
}
