
import CategoryModal from '../CategoryModal/CategoryModal';
export default function TableDetails({showAddCategory,caption,details,btnDetails,addNewCategoryFunction,categoryName,buttonInfo,categoryFunction,handleShowFunction,setShowAddCategory}) {
  
    
 
  const handleCloseAddCategory = () => setShowAddCategory(false);



return <>


<CategoryModal formBtn={'Save'} modalHeader={'Add new category'} showCategory={showAddCategory} handleShowFunction={handleShowFunction} categoryFunction={categoryFunction} buttonInfo={buttonInfo} show={showAddCategory} close ={handleCloseAddCategory}/>
<div className="details d-flex justify-content-between align-items-center">
    <div className="caption">
    <h4>{caption}</h4>
    <p>{details} </p>
    </div>
    <button    onClick={handleShowFunction} className='btn btn-success px-5'>{btnDetails}

      <span className='sr-only'>click to {btnDetails}</span>
    </button>
</div>
</>
}