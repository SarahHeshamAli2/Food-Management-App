import Dropdown from 'react-bootstrap/Dropdown';
import CategoryModal from '../CategoryModal/CategoryModal';
import { useNavigate } from 'react-router-dom';
;


export default function EditToolsDropDown({nav,catName,categoryName,handleShowFunction,handleShow,categoryFunction,showEditCategory,setShowEditCategory,categoryId}) {

    const handleCloseAddCategory = () => setShowEditCategory(false);

    const navigate = useNavigate()


    const navigateToRecipieForm = (catId,catName)=>{
      handleShowFunction  &&   handleShowFunction(catId,catName)
        nav ? navigate(`/recipie/${catId}`)
         : ''
         
    }
 return <>
   <div className="cursorPointer">
    
  <Dropdown>
      <Dropdown.Toggle   id="dropdown-basic">
      <i  className="fa-solid fa-ellipsis fa-fw"></i>
      <span className='sr-only'>click to toggle menu</span>

      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item > <i className="fa-solid fa-eye option-icons"></i>View</Dropdown.Item>
        <Dropdown.Item   onClick={()=>{navigateToRecipieForm(categoryId,categoryName)}}> <i className="fa-solid fa-pen-to-square option-icons " ></i> Edit 
        <span className='sr-only'>click to edit category {categoryName}</span>
        
        </Dropdown.Item>
    
        <Dropdown.Item  onClick={()=>{handleShow(categoryId)}}><i className="fa-solid fa-trash-can option-icons"></i>Delete
        
        <span className='sr-only'>click to delete category {categoryName}</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <CategoryModal catName={catName}  formBtn={'Edit'} show={showEditCategory} modalHeader={'Edit this category'} handleShowFunction={handleShowFunction} categoryFunction={categoryFunction} showCategory={showEditCategory} close ={handleCloseAddCategory}/> 

  </div>
 
 </>
}
