import Dropdown from 'react-bootstrap/Dropdown';
import CategoryModal from '../CategoryModal/CategoryModal';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import { CATEGORY_URLs, privateAxiosInstance, RECIPIE_URLs, USERs_URLs } from '../../../../services/urls';
import RecipieDetail from '../../../reciepes/components/RecipieDetailModal/RecipieDetail';
;


export default function EditToolsDropDown({nav,showA,from,catName,categoryName,handleShowFunction,handleShow,categoryFunction,showEditCategory,setShowEditCategory,categoryId}) {
  
    const handleCloseAddCategory = () => setShowEditCategory(false);

    const navigate = useNavigate()
    const { loginData
    } = useContext(AuthContext)
    const userRole = loginData?.roles[0]
    
    const navigateToRecipieForm = (catId,catName)=>{
      handleShowFunction  &&   handleShowFunction(catId,catName)
        nav ? navigate(`/recipie/${catId}`)
         : ''
         
    }


    const [show, setShow] = useState(false);
    const [recipieImg, setRecipieImg] = useState(null);
    const [recipieTag, setRecipieTag] = useState(null);
    const [recipieName, setRecipieName] = useState(null);
    const [recipiePrice, setRecipiePrice] = useState(null);
    const [showAddButton, setShowAddButton] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShowRecipieDetail = (e) => {
      
      if(e  == 'View'  || showA==false) {
        setShowAddButton(false)  
      
      }
      else {
        setShowAddButton(true)  

      }
      
      if(from == 'recipe') {
        setShow(true);
        setIsLoading(true)
           privateAxiosInstance.get(RECIPIE_URLs.GET_RECIPIE_BY_ID(categoryId)).then((resp)=>{
       setIsLoading(false)

          setRecipieImg(resp?.data?.imagePath)
          setRecipieTag(resp?.data?.tag.name)
          setRecipieName(resp?.data?.name)
          setRecipiePrice(resp?.data?.price)

      }).catch((error)=>{
   console.log(error);
   setIsLoading(false)

          
       })
      }
      
      else {
        setShow(true);
        setIsLoading(true)
           privateAxiosInstance.get(CATEGORY_URLs.ToGGLE_CATEGORY(categoryId)).then((resp)=>{
       setIsLoading(false)

          setRecipieName(resp?.data?.name)

      }).catch((error)=>{
   console.log(error);
   setIsLoading(false)

          
       })
      }
        
        

      
    }

    

 return <>
   <div className="cursorPointer">
    
  <Dropdown>
      <Dropdown.Toggle   id="dropdown-basic">
      <i  className="fa-solid fa-ellipsis fa-fw"></i>
      <span className='sr-only'>click to toggle menu</span>

      </Dropdown.Toggle>

      <Dropdown.Menu>
        {from != 'userList' ?         <Dropdown.Item  onClick={(e)=>{handleShowRecipieDetail(e.target.innerText)}} > <i className="fa-solid fa-eye option-icons"></i>View</Dropdown.Item>
 : '' }


        {

            userRole != 'User' ? <>
       {
        from != 'userList' ?            <Dropdown.Item   onClick={()=>{navigateToRecipieForm(categoryId,categoryName)}}> <i className="fa-solid fa-pen-to-square option-icons " ></i> Edit 
        <span className='sr-only'>click to edit category {categoryName}</span>
        
        </Dropdown.Item> : ''
       }
    
        <Dropdown.Item  onClick={()=>{handleShow(categoryId)}}><i className="fa-solid fa-trash-can option-icons"></i>Delete
        
        <span className='sr-only'>click to delete category {categoryName}</span>
        </Dropdown.Item>
            </> : 
      <Dropdown.Item onClick={(e)=>{handleShowRecipieDetail(e.target.innerText)}} ><i className="fa-regular fa-heart option-icons"></i>Add to favorites
        
      <span className='sr-only'>click to delete category </span>
      </Dropdown.Item>
        }
  
      </Dropdown.Menu>
    </Dropdown>

    <CategoryModal catName={catName}  formBtn={'Edit'} show={showEditCategory} modalHeader={'Edit this category'} handleShowFunction={handleShowFunction} categoryFunction={categoryFunction} showCategory={showEditCategory} close ={handleCloseAddCategory}/> 
        <RecipieDetail from={from} showAddButton={showAddButton} setShow={setShow} recipiePrice={recipiePrice} recipieName={recipieName} recipieTag={recipieTag} isLoading={isLoading} recipieImg={recipieImg} recipieId= {categoryId} show ={show} handleClose = {handleClose}  />
  </div>
 
 </>
}
