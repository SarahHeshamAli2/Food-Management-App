
import { useNavigate } from 'react-router-dom';
import CategoryModal from '../CategoryModal/CategoryModal';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
export default function TableDetails({btn,nav,showAddCategory,caption,details,btnDetails,addNewCategoryFunction,categoryName,buttonInfo,categoryFunction,handleShowFunction,setShowAddCategory}) {
  
    
 
  const handleCloseAddCategory = () => setShowAddCategory(false);

  const navigate = useNavigate()
  
  const navigateToRecipieForm = ()=> {
 handleShowFunction  && handleShowFunction()
    nav ? navigate('/recipie/new-recipie') : ''
    
    
  }

  const {loginData}=useContext(AuthContext)

  const userRole = loginData?.roles[0]

return <>


<CategoryModal formBtn={'Save'} modalHeader={'Add new category'} showCategory={showAddCategory} handleShowFunction={handleShowFunction} categoryFunction={categoryFunction} buttonInfo={buttonInfo} show={showAddCategory} close ={handleCloseAddCategory}/>
<div className="details  d-flex justify-content-between align-items-center">
    <div className="caption">
    <h4>{caption}</h4>
    <p>{details} </p>


    </div> {
      btn && userRole !='User' ?     <button    onClick={navigateToRecipieForm} className='btn btn-success px-5'>{btnDetails}

      <span  className='sr-only'>click to {btnDetails}</span>
    </button> : ''
    }

</div>
</>
}
